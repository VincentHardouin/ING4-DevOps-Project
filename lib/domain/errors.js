class DomainError extends Error {
  constructor(message, code, meta) {
    super(message)
    this.code = code
    this.meta = meta
  }
}

class AlreadyRegisteredUsernameError extends DomainError {
  constructor(message = 'Cet username est déjà utilisé.') {
    super(message)
  }
}

class EntityValidationError extends DomainError {
  constructor({ invalidAttributes }) {
    super('Echec de validation de l‘entité.')
    this.invalidAttributes = invalidAttributes
  }

  static fromJoiErrors(joiErrors) {
    const invalidAttributes = joiErrors.map((error) => {
      return { attribute: error.context.key, message: error.message }
    })
    return new EntityValidationError({ invalidAttributes })
  }

  static fromMultipleEntityValidationErrors(entityValidationErrors) {
    const invalidAttributes = entityValidationErrors.reduce(
      (invalidAttributes, entityValidationError) => {
        invalidAttributes.push(...entityValidationError.invalidAttributes)
        return invalidAttributes
      },
      []
    )
    return new EntityValidationError({ invalidAttributes })
  }
}

module.exports = {
  DomainError,
  AlreadyRegisteredUsernameError,
  EntityValidationError,
}
