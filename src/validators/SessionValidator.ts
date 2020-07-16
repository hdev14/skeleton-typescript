import { object, string } from 'yup'
import { Request, Response, NextFunction } from 'express'

class SessionValidator {
  async create (req: Request, res: Response, next: NextFunction) {
    try {
      const schema = object().shape({
        email: string().email().required(),
        password: string().min(6).required()
      })

      await schema.validate(req.body, { strict: true })
      return next()
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }
}

export default new SessionValidator()
