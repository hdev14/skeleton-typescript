import { Request, Response, NextFunction } from 'express'
import { ErrorInterface } from '../errors/ResponseError'

function globalErrorHandler (err: ErrorInterface, req: Request, res: Response, next: NextFunction) {
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      error: err.name,
      message: err.message
    })
  }

  console.error(err)

  return res.status(500).json({
    error: err.name,
    message: 'Something wrong'
  })
}

export default globalErrorHandler
