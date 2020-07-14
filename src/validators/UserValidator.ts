import { object, string } from 'yup'
import { Request, Response, NextFunction } from 'express'

class UserValidator {
  public async create (req: Request, res: Response, next: NextFunction) {
    try {
      const schema = object().shape({
        name: string().required(),
        email: string().email().required(),
        password: string().min(6).required()
      })

      await schema.validate(req.body, { strict: true })
      return next()
    } catch (err) {
      return res.status(400).json({
        error: err.message
      })
    }
  }

  public async update (req: Request, res: Response, next: NextFunction) {
    try {
      const schema = object().shape({
        name: string().notRequired(),
        email: string().email().notRequired(),
        password: string().min(6).notRequired()
      })

      await schema.validate(req.body, { strict: true })
      return next()
    } catch (err) {
      return res.status(400).json({
        error: err.message
      })
    }
  }
}

export default new UserValidator()
