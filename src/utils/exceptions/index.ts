export abstract class HttpException extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

export class NotFoundException extends HttpException {
  private static status = 404

  constructor(message: string) {
    super(NotFoundException.status, message)
  }
}

export class UnauthorizedException extends HttpException {
  private static status = 401

  constructor(message: string) {
    super(UnauthorizedException.status, message)
  }
}
