const { expect, sinon } = require('../../../test-helper')
const updateUserPassword = require('../../../../lib/domain/usecases/update-user-password')
const userRepository = require('../../../../lib/infrastructure/repositories/user-repository')

const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

describe('Unit | usecases | update-user-password', () => {
  it('should save a hashed password', async () => {
    // given
    const username = 'michel'
    const password = 'abcd'
    const hashedPassword = 'hashedPassword'
    const stubUpdatePassword = sinon.stub(userRepository, 'updatePassword')
    sinon.stub(bcrypt, 'hash').yields(null, hashedPassword)
    const token = 'dsqreaz'
    sinon.stub(jsonwebtoken, 'verify').returns({ username })

    // when
    await updateUserPassword({ token, password, userRepository })

    // then
    expect(stubUpdatePassword).to.have.been.calledWith(username, hashedPassword)
  })
})
