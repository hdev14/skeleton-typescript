import { Request, Response } from 'express'

import User from '../entities/User'

class UserController {
  async index (req: Request, res: Response) {
    const users = await User.find()
    return res.json(users)
  }

  async store (req: Request, res: Response) {
    const user = new User()
    user.name = 'user'
    user.email = 'user@email.com'
    user.password = '123456'
    await user.save()
    return res.status(201).json(user)
  }

  async update (req: Request, res: Response) {
    const { id } = req.params
    const user = await User.findOneOrFail(id)
    const { name, email } = req.body
    user.name = name
    user.email = email
    await user.save()
    return res.json(user)
  }

  async delete (req: Request, res: Response) {
    const { id } = req.params
    const user = await User.findOneOrFail(id)
    await user.remove()
    return res.status(204).json()
  }
}

export default new UserController()
