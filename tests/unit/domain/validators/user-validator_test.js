/* eslint-disable mocha/no-identical-title */
const { expect, catchErr } = require('../../../test-helper')
const userValidator = require('../../../../lib/domain/validators/user-validator')
const { EntityValidationError } = require('../../../../lib/domain/errors')
const User = require('../../../../lib/domain/models/User')

const MISSING_VALUE = ''

function _assertErrorMatchesWithExpectedOne(
  entityValidationErrors,
  expectedError
) {
  expect(entityValidationErrors).to.be.instanceOf(EntityValidationError)
  expect(entityValidationErrors.invalidAttributes).to.have.lengthOf(1)
  expect(entityValidationErrors.invalidAttributes[0]).to.deep.equal(
    expectedError
  )
}

describe('Unit | Domain | Validators | user-validator', function () {
  let user

  describe('#validate', () => {
    context('when validation is for normal user', () => {
      beforeEach(() => {
        user = new User({
          username: 'JohnDoe123',
          password: 'Password1234',
        })
      })

      context('when validation is successful', () => {
        it('should not throw any error', () => {
          expect(userValidator.validate({ user })).to.not.throw
        })
      })

      context('when user data validation fails', () => {
        it('should reject with error when user is undefined', () => {
          // given
          const expectedError = {
            attribute: undefined,
            message: 'Aucun champ n‘est renseigné.',
          }

          // when
          try {
            userValidator.validate({ user: undefined })
            expect.fail('should have thrown an error')
          } catch (errors) {
            // then
            _assertErrorMatchesWithExpectedOne(errors, expectedError)
          }
        })

        it('should reject with error on field "password" when password is missing', async () => {
          // given
          const expectedError = {
            attribute: 'password',
            message: 'Votre mot de passe n’est pas renseigné.',
          }
          user.password = MISSING_VALUE

          // when
          const errors = await catchErr(userValidator.validate)({ user })

          // then
          _assertErrorMatchesWithExpectedOne(errors, expectedError)
        })

        it('should reject with error on field "password" when password is invalid', async () => {
          // given
          const expectedError = {
            attribute: 'password',
            message:
              'Votre mot de passe doit contenir 8 caractères au minimum et comporter au moins une majuscule, une minuscule et un chiffre.',
          }
          user.password = 'invalid'

          // when
          const errors = await catchErr(userValidator.validate)({ user })

          // then
          _assertErrorMatchesWithExpectedOne(errors, expectedError)
        })

        it('should reject with error on field "username" when email is missing', async () => {
          // given
          const expectedError = {
            attribute: 'username',
            message: 'Votre identifiant n’est pas renseigné.',
          }
          user.username = MISSING_VALUE

          // when
          const errors = await catchErr(userValidator.validate)({ user })

          // then
          _assertErrorMatchesWithExpectedOne(errors, expectedError)
        })

        it('should reject with errors on all fields (but only once by field) when all fields are missing', async () => {
          // given
          user = {
            username: '',
            password: '',
          }

          // when
          const errors = await catchErr(userValidator.validate)({ user })

          // then
          expect(errors.invalidAttributes).to.have.lengthOf(2)
        })

        it('should reject with errors on username and password when username and password have a maximum length of 255', async () => {
          // given
          const expectedMaxLengthUsernameError = {
            attribute: 'username',
            message:
              'Votre identifiant ne doit pas dépasser les 255 caractères.',
          }
          const expectedPasswordError = {
            attribute: 'password',
            message:
              'Votre mot de passe ne doit pas dépasser les 255 caractères.',
          }

          user = {
            username: 'john.doe'.repeat(50),
            password: 'Password1234'.repeat(22),
          }

          // when
          const errors = await catchErr(userValidator.validate)({ user })

          // then
          expect(errors.invalidAttributes).to.have.lengthOf(2)
          expect(errors).to.be.instanceOf(EntityValidationError)
          expect(errors.invalidAttributes[0]).to.deep.equal(
            expectedMaxLengthUsernameError
          )
          expect(errors.invalidAttributes[1]).to.deep.equal(
            expectedPasswordError
          )
        })
      })
    })
  })
})
