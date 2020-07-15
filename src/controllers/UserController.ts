import { getRepository } from 'typeorm'
import { Request, Response } from 'express'

import User from '../models/User'

class UserController {
  async index (req: Request, res: Response) {
    const users = await getRepository(User).find()
    return res.json(users)
  }

  async create (req: Request, res: Response) {
    const repository = getRepository(User)
    const user = repository.create(req.body)
    const createdUser = await repository.save(user)
    return res.status(201).json(createdUser)
  }

  async update (req: Request, res: Response) {
    try {
      const repository = getRepository(User)
      const user = await repository.findOneOrFail(req.params.id)
      repository.merge(user, req.body)
      const updatedUser = await repository.save(user)
      return res.json(updatedUser)
    } catch (err) {
      if (err.name === 'EntityNotFound') {
        return res.status(400).json({ error: err.message })
      } else {
        return res.status(500).json({ error: 'Something wrong' })
      }
    }
  }

  async delete (req: Request, res: Response) {
    try {
      const repository = getRepository(User)
      const user = await repository.findOneOrFail(req.params.id)
      await repository.delete(user.id)
      return res.status(204).json()
    } catch (err) {
      if (err.name === 'EntityNotFound') {
        return res.status(400).json({ error: err.message })
      } else {
        return res.status(500).json({ error: 'Something wrong' })
      }
    }
  }
}

export default UserController
