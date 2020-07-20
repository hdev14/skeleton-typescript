import RequestError from '../errors/RequestError'

export default function notfoundError (error: Error): void {
  if (error.name === 'EntityNotFound') {
    throw new RequestError(error.message, error.name, 404)
  }

  throw error
}
