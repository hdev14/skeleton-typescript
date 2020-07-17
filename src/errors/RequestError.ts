export interface RequestErrorInterface extends Error {
  statusCode?: number
}

class RequestError implements RequestErrorInterface {
  public readonly name: string
  public readonly message: string
  public readonly statusCode: number

  constructor (message: string, name = 'RequestError', statusCode = 400) {
    this.message = message
    this.name = name
    this.statusCode = statusCode
  }
}

export default RequestError
