import ResponseError from '../errors/ResponseError'

export default function notfoundError (error: Error): void {
  if (error.name === 'EntityNotFound') {
    throw new ResponseError(error.message, error.name, 404)
  }

  throw error
}
