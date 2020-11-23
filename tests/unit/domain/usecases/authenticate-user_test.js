const { expect, sinon, catchErr } = require('../../../test-helper')
const authenticateUser = require('../../../../lib/domain/usecases/authenticate-user')
const {
  MissingOrInvalidCredentialsError,
} = require('../../../../lib/domain/errors')
const userRepository = require('../../../../lib/infrastructure/repositories/user-repository')
const config = require('../../../../lib/config')

const _ = require('lodash')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

describe('Unit | usecases | create-user', () => {
  it('should return token who contains username', async () => {
    // given
    const username = 'test-username'
    const password = 'Passw0rd-username'
    sinon.stub(userRepository, 'getByUsername')
    userRepository.getByUsername.resolves({ username, password })
    sinon.stub(bcrypt, 'compare').yields(null, 'ok')
    const expectedTokenAttribute = {
      username,
    }

    // when
    const rsltToken = await authenticateUser({
      username,
      password,
      userRepository,
    })

    // then
    const decodedToken = jsonwebtoken.verify(
      rsltToken,
      config.authentication.secret
    )
    expect(_.omit(decodedToken, ['iat', 'exp'])).to.deep.equal(
      expectedTokenAttribute
    )
  })

  context('when password not matching', () => {
    it('should throw PasswordNotMatching error', async () => {
      // given
      const username = 'test-username'
      const password = 'Passw0rd-username'
      sinon.stub(userRepository, 'getByUsername')
      userRepository.getByUsername.resolves({ username, password })
      sinon.stub(bcrypt, 'compare').yields(null, null)
      const expectedToken = Symbol('token')
      sinon.stub(jsonwebtoken, 'sign').returns(expectedToken)

      // when
      const error = await catchErr(authenticateUser)({
        username: username,
        password: password,
        userRepository,
      })

      // then
      expect(error).to.be.instanceOf(MissingOrInvalidCredentialsError)
    })
  })
})
