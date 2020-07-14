import { Request, Response } from 'express'

import User from '../entities/User'

class UserController {
  async index (req: Request, res: Response) {
    const users = await User.find()
    return res.json(users)
  }

  async create (req: Request, res: Response) {
    const { name, email, password } = req.body
    const user = new User()
    user.name = name
    user.email = email
    user.password = password
    await user.save()
    return res.status(201).json(user)
  }

  async update (req: Request, res: Response) {
    const { id } = req.params
    const user = await User.findOne(id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    const { name, email } = req.body
    user.name = name
    user.email = email
    await user.save()
    return res.json(user)
  }

  async delete (req: Request, res: Response) {
    const { id } = req.params
    const user = await User.findOne(id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    await user.remove()
    return res.status(204).json()
  }
}

export default new UserController()
