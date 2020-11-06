class BaseHttpError extends Error {
  constructor(message) {
    super(message)
    this.title = 'Default Bad Request'
    this.status = 400
  }
}

class UnprocessableEntityError extends BaseHttpError {
  constructor(message) {
    super(message)
    this.title = 'Unprocessable entity'
    this.status = 422
  }
}

class PreconditionFailedError extends BaseHttpError {
  constructor(message, title) {
    super(message)
    this.title = title || 'Precondition Failed'
    this.status = 412
  }
}

class ConflictError extends BaseHttpError {
  constructor(
    message = 'Conflict between request and server state.',
    code,
    meta
  ) {
    super(message)
    this.code = code
    this.meta = meta
    this.title = 'Conflict'
    this.status = 409
  }
}

class MissingQueryParamError extends BaseHttpError {
  constructor(missingParamName) {
    const message = `Missing ${missingParamName} query parameter.`
    super(message)
    this.title = 'Missing Query Parameter'
    this.status = 400
  }
}

class NotFoundError extends BaseHttpError {
  constructor(message, title) {
    super(message)
    this.title = title || 'Not Found'
    this.status = 404
  }
}

class UnauthorizedError extends BaseHttpError {
  constructor(message) {
    super(message)
    this.title = 'Unauthorized'
    this.status = 401
  }
}

class ForbiddenError extends BaseHttpError {
  constructor(message) {
    super(message)
    this.title = 'Forbidden'
    this.status = 403
  }
}

class BadRequestError extends BaseHttpError {
  constructor(message) {
    super(message)
    this.title = 'Bad Request'
    this.status = 400
  }
}

class PayloadTooLargeError extends BaseHttpError {
  constructor(message = 'La taille du fichier doit être inférieure à 10Mo.') {
    super(message)
    this.title = 'Payload too large'
    this.status = 413
  }
}

function sendJsonApiError(httpError, res) {
  const jsonApiError = {
    status: httpError.status.toString(),
    title: httpError.title,
    detail: httpError.message,
  }
  return res(httpError).json(jsonApiError)
}

module.exports = {
  BadRequestError,
  BaseHttpError,
  ConflictError,
  ForbiddenError,
  MissingQueryParamError,
  NotFoundError,
  PayloadTooLargeError,
  PreconditionFailedError,
  sendJsonApiError,
  UnauthorizedError,
  UnprocessableEntityError,
}
