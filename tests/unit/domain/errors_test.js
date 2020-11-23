const { expect } = require('../../test-helper')
const errors = require('../../../lib/domain/errors')

describe('Unit | Domain | Errors', () => {
  it('should export a DomainError', () => {
    expect(errors.DomainError).to.exist
  })

  it('should export an AlreadyRegisteredUsernameError', () => {
    expect(errors.AlreadyRegisteredUsernameError).to.exist
  })

  it('should export an EntityValidationError', () => {
    expect(errors.EntityValidationError).to.exist
  })

  describe('EntityValidationError', () => {
    context('#fromJoiErrors', () => {
      it('should populate the invalidAttributes key', () => {
        //given
        const joiErrors = [
          {
            context: {
              key: 'name',
            },
            message: 'name should not be empty',
          },
          {
            context: {
              key: 'email',
            },
            message: 'email is not a valid email address',
          },
        ]

        // when
        const error = errors.EntityValidationError.fromJoiErrors(joiErrors)

        // then
        expect(error.invalidAttributes).to.deep.equal([
          {
            attribute: 'name',
            message: 'name should not be empty',
          },
          {
            attribute: 'email',
            message: 'email is not a valid email address',
          },
        ])
      })
    })

    context('#fromEntityValidationError', () => {
      it('should populate the invalidAttributes key', () => {
        //given
        const error1 = new errors.EntityValidationError({
          invalidAttributes: [
            {
              attribute: 'name',
              message: 'name should not be empty',
            },
            {
              attribute: 'email',
              message: 'email is not a valid email address',
            },
          ],
        })
        const error2 = new errors.EntityValidationError({
          invalidAttributes: [
            {
              attribute: 'card',
              message: 'card should have money on it',
            },
            {
              attribute: 'token',
              message: 'token should be valid',
            },
          ],
        })

        // when
        const error = errors.EntityValidationError.fromMultipleEntityValidationErrors(
          [error1, error2]
        )

        // then
        expect(error.invalidAttributes).to.deep.equal([
          {
            attribute: 'name',
            message: 'name should not be empty',
          },
          {
            attribute: 'email',
            message: 'email is not a valid email address',
          },
          {
            attribute: 'card',
            message: 'card should have money on it',
          },
          {
            attribute: 'token',
            message: 'token should be valid',
          },
        ])
      })
    })
  })

  it('should export an MissingOrInvalidCredentialsError', () => {
    expect(errors.MissingOrInvalidCredentialsError).to.exist
  })

  it('should export an PasswordNotMatchingError', () => {
    expect(errors.PasswordNotMatchingError).to.exist
  })
})
