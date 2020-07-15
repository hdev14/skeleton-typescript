import { Response } from 'express'

interface ResponseError {
  error: string
}

export default function notfoundError (error: Error, res: Response): Response<ResponseError> {
  if (error.name === 'EntityNotFound') {
    return res.status(400).json({ error: error.message })
  }

  return res.status(500).json({ error: 'Something wrong' })
}
