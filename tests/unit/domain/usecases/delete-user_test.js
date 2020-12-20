const { expect, sinon } = require('../../../test-helper')
const deleteUser = require('../../../../lib/domain/usecases/delete-user')
const userRepository = require('../../../../lib/infrastructure/repositories/user-repository')
const jsonwebtoken = require('jsonwebtoken')
const settings = require('../../../../lib/config')

describe('Unit | usecases | delete-user', () => {
  beforeEach(() => {
    sinon.stub(userRepository, 'deleteUser')
    sinon.stub(jsonwebtoken, 'verify')
  })

  it('should call userRepository delete function with username', async () => {
    // given
    const token = 'toto'
    const username = 'name'
    userRepository.deleteUser.resolves(true)
    jsonwebtoken.verify.returns({ username: username })
    // when
    const result = await deleteUser({
      token,
      userRepository,
    })
    // then
    expect(userRepository.deleteUser).to.have.been.calledWith(username)
    expect(jsonwebtoken.verify).to.have.been.calledWith(
      token,
      settings.authentication.secret
    )
    expect(result).to.be.true
  })

  it('should return false', async () => {
    // given
    const token = 'toto'
    const username = 'name'
    userRepository.deleteUser.resolves(true)
    jsonwebtoken.verify.throws(new Error())
    // when
    const result = await deleteUser({
      token,
      userRepository,
    })
    // then
    expect(userRepository.deleteUser).to.not.have.been.calledWith(username)
    expect(jsonwebtoken.verify).to.have.been.calledWith(
      token,
      settings.authentication.secret
    )
    expect(result).to.be.false
  })
})
