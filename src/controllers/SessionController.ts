import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { Request, Response } from 'express'

import User from '../models/User'

class SessionController {
  async create (req: Request, res: Response) {
    const { email, password } = req.body
    const user = await getRepository(User).findOne({
      select: ['id', 'name', 'email', 'password'],
      where: { email: email }
    })

    if (user && (await compare(password, user.password))) {
      const token = sign({ id: user.id }, '51a1a2d76edbf9f0c3141d8e4c9321bb', { expiresIn: '1d' })
      delete user.password
      return res.status(201).json({ user, token })
    }

    return res.status(400).json({ error: 'Email or passowrd incorrect' })
  }
}

export default SessionController
