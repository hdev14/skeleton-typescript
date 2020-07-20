import { verify, JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import { Request, Response, NextFunction, json } from 'express'

import authConfig from '../configs/auth'

interface Payload {
  id: string,
  iat: number,
  exp: number
}

export default function auth (req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1]

  try {
    if (token) {
      const decoded = verify(token, authConfig.secret) as Payload
      req.userId = decoded.id
      return next()
    }

    throw new Error('Token is required')
  } catch (err) {
    if (err.name === JsonWebTokenError || err.name === TokenExpiredError.name) {
      return res.status(401).json({ error: err.message })
    }
    return res.status(403).json({ error: err.message })
  }
}
