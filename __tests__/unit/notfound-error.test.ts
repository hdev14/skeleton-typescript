import RequestError from '../../src/errors/RequestError'
import notfoundError from '../../src/helpers/notfound-error'

describe('Not Found Error', () => {
  it('Should throw an error ResponseError with status 404', () => {
    const error = {
      name: 'EntityNotFound',
      message: 'Entity not found'
    }

    expect(notfoundError(error)).toThrowError(new RequestError(error.message, error.name, 404))
  })
})
