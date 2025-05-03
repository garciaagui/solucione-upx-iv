export abstract class HttpException extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

export class BadRequestException extends HttpException {
  private static status = 400

  constructor(message: string) {
    super(BadRequestException.status, message)
  }
}

export class ConflictException extends HttpException {
  private static status = 409

  constructor(message: string) {
    super(ConflictException.status, message)
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
