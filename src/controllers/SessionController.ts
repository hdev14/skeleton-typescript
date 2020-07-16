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
      const secret = process.env.APP_KEY || 'supersecret'
      const token = sign({ id: user.id }, secret, { expiresIn: '1d' })
      delete user.password
      return res.status(201).json({ user, token })
    }

    return res.status(400).json({ error: 'Email or passowrd incorrect' })
  }
}

export default SessionController
