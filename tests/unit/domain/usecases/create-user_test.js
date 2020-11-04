const { expect, sinon, catchErr } = require('../../../test-helper')
const createUser = require('../../../../lib/domain/usecases/create-user')
const User = require('../../../../lib/domain/models/User')
const {
  AlreadyRegisteredUsernameError,
  EntityValidationError,
} = require('../../../../lib/domain/errors')
const userRepository = require('../../../../lib/infrastructure/repositories/user-repository')
const userValidator = require('../../../../lib/domain/validators/user-validator')
const bcrypt = require('bcrypt')

describe('Unit | usecases | create-user', () => {
  beforeEach(() => {
    sinon.stub(userValidator, 'validate')
    sinon.stub(userRepository, 'save')
    sinon.stub(userRepository, 'isUsernameAvailable')
    sinon.stub(bcrypt, 'hash').yields(null, 'password')
  })

  it('should return saved user', async () => {
    // given
    const user = {
      username: 'nidourah',
      password: 'PA$$w0rd',
    }
    const expectedUser = new User(user)
    userValidator.validate.resolves(true)
    userRepository.isUsernameAvailable.resolves(true)
    userRepository.save.returns(expectedUser)

    // when
    const result = await createUser({
      username: user.username,
      password: user.password,
      userRepository,
    })

    // then
    expect(result).to.be.instanceOf(User)
    expect(result.username).to.be.equal(user.username)
    expect(userRepository.save).to.have.been.called
    expect(bcrypt.hash).to.have.been.called
  })

  it('should check non existence of username in user repository', async () => {
    // given
    const user = new User({
      username: 'nidourah',
      password: 'PA$$w0rd',
    })
    userValidator.validate.resolves(true)
    userRepository.isUsernameAvailable.resolves(true)
    userRepository.save.returns({})

    // when
    await createUser({
      username: user.username,
      password: user.password,
      userRepository,
    })

    // then
    expect(userRepository.isUsernameAvailable).to.have.been.calledWith(
      user.username
    )
  })

  context('when username is not defined', () => {
    it('should not call isUsernameAvailable', async () => {
      // given
      const user = new User({
        username: undefined,
        password: 'PA$$w0rd',
      })

      userValidator.validate.throws(
        new EntityValidationError({
          invalidAttributes: [
            {
              attribute: 'username',
              message: 'Votre identifiant n’est pas renseigné.',
            },
          ],
        })
      )
      userRepository.isUsernameAvailable.resolves()

      // when
      const error = await catchErr(createUser)({
        username: user.username,
        password: user.password,
        userRepository,
      })

      // then
      expect(error).to.be.instanceOf(EntityValidationError)
      expect(error.invalidAttributes).to.have.length(1)
      expect(userRepository.isUsernameAvailable.notCalled)
    })
  })

  context('when username is already used', () => {
    it('should reject with an error EntityValidationError', async () => {
      // given
      const user = new User({
        username: 'nidourah',
        password: 'PA$$w0rd',
      })

      userValidator.validate.resolves(true)
      userRepository.isUsernameAvailable.rejects(
        new AlreadyRegisteredUsernameError()
      )

      // when
      const error = await catchErr(createUser)({
        username: user.username,
        password: user.password,
        userRepository,
      })

      // then
      expect(error).to.be.instanceOf(EntityValidationError)
    })
  })

  context('when username is already used and password is invalid', () => {
    it('should reject with an error EntityValidationError with 2 errors', async () => {
      // given
      const user = new User({
        username: 'nidourah',
        password: 'PA$$d',
      })

      userValidator.validate.throws(
        new EntityValidationError({
          invalidAttributes: [
            {
              attribute: 'password',
              message: 'Votre mot de pass n’est pas valide.',
            },
          ],
        })
      )
      userRepository.isUsernameAvailable.rejects(
        new AlreadyRegisteredUsernameError()
      )

      // when
      const error = await catchErr(createUser)({
        username: user.username,
        password: user.password,
        userRepository,
      })

      // then
      expect(error).to.be.instanceOf(EntityValidationError)
      expect(error.invalidAttributes).to.have.length(2)
    })
  })
})
