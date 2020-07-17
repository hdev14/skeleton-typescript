import { Request, Response, NextFunction } from 'express'
import { RequestErrorInterface } from '../errors/RequestError'

function globalErrorHandler (err: RequestErrorInterface, req: Request, res: Response, next: NextFunction) {
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
