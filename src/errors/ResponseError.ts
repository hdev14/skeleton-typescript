export interface ErrorInterface extends Error {
  statusCode?: number
}

class ResponseError implements ErrorInterface {
  public readonly name: string
  public readonly message: string
  public readonly statusCode: number

  constructor (message: string, name = 'ResponseError', statusCode = 400) {
    this.message = message
    this.name = name
    this.statusCode = statusCode
  }
}

export default ResponseError
