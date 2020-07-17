import { getRepository } from 'typeorm'
import { Request, Response } from 'express'
import path from 'path'
import fs from 'fs'

import User from '../models/User'

import notfoundError from '../helpers/notfound-error'

class UserController {
  public async index (req: Request, res: Response) {
    const users = await getRepository(User).find({
      select: ['id', 'name', 'email']
    })
    return res.json(users)
  }

  public async create (req: Request, res: Response) {
    const repository = getRepository(User)

    const userExists = await repository.findOne({ where: { email: req.body.email } })
    if (userExists) {
      return res.status(400).json({ error: 'Email already exists' })
    }

    const user = repository.create(req.body)
    const createdUser = await repository.save(user)
    return res.status(201).json(createdUser)
  }

  public async update (req: Request, res: Response) {
    try {
      const repository = getRepository(User)
      const user = await repository.findOneOrFail(req.params.id)
      repository.merge(user, req.body)
      const updatedUser = await repository.save(user)
      return res.json(updatedUser)
    } catch (err) {
      return notfoundError(err)
    }
  }

  public async updatePhoto (req: Request, res: Response) {
    try {
      const { filename } = req.file
      const repository = getRepository(User)
      const user = await repository.findOneOrFail(req.userId)

      if (user.photo) {
        const tmpPath = path.resolve(__dirname, '..', '..', 'tmp')
        const filePath = path.join(tmpPath, user.photo)

        const file = await fs.promises.stat(filePath)
        if (file.isFile()) {
          await fs.promises.unlink(filePath)
        }
      }
      user.photo = filename
      const updatedUser = await repository.save(user)
      return res.json(updatedUser)
    } catch (err) {
      return notfoundError(err)
    }
  }

  public async delete (req: Request, res: Response) {
    try {
      const repository = getRepository(User)
      const user = await repository.findOneOrFail(req.params.id)
      await repository.delete(user.id)
      return res.status(204).json()
    } catch (err) {
      return notfoundError(err)
    }
  }
}

export default UserController
