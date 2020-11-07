const _ = require('lodash')
const HttpErrors = require('./http-errors')
const DomainErrors = require('../domain/errors')

function _formatAttribute({ attribute, message }) {
  return {
    status: '422',
    source: {
      pointer: `/data/attributes/${_.kebabCase(attribute)}`,
    },
    title: `Invalid data attribute "${attribute}"`,
    detail: message,
  }
}

function _formatUndefinedAttribute({ message }) {
  return {
    status: '422',
    title: 'Invalid data attributes',
    detail: message,
  }
}

function _formatInvalidAttribute({ attribute, message }) {
  if (!attribute) {
    return _formatUndefinedAttribute({ message })
  }
  return _formatAttribute({ attribute, message })
}

function _mapToHttpError(error) {
  if (error instanceof HttpErrors.BaseHttpError) {
    return error
  }
  if (error instanceof DomainErrors.MissingOrInvalidCredentialsError) {
    return new HttpErrors.UnauthorizedError(
      'L‘identifiant et/ou le mot de passe saisis sont incorrects.'
    )
  }
  return new HttpErrors.BaseHttpError(error.message)
}

function handle(err, res) {
  if (err instanceof DomainErrors.EntityValidationError) {
    return res
      .status(422)
      .json(err.invalidAttributes.map(_formatInvalidAttribute))
  }

  const httpError = _mapToHttpError(err)

  return res.status(httpError.status).jsonp(httpError.message)
}

module.exports = { handle }
