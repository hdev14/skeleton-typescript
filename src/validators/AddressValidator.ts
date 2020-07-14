import { object, string, number } from 'yup'
import { Request, Response, NextFunction } from 'express'
import AddressController from '../controllers/AddressController'

class AddressValidator {
  public async create (req: Request, res: Response, next: NextFunction) {
    try {
      const schema = object().shape({
        street: string().required(),
        neighborhood: string().required(),
        address_number: number().required(),
        city: string().required(),
        state: string().required(),
        complement: string().notRequired()
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
        street: string().notRequired(),
        neighborhood: string().notRequired(),
        address_number: number().notRequired(),
        city: string().notRequired(),
        state: string().notRequired(),
        complement: string().notRequired()
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

export default new AddressValidator()
