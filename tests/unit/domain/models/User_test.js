const { expect } = require('../../../test-helper')
const User = require('../../../../lib/domain/models/User')

describe('Unit | models | User', () => {
  it('should instantiate User object', () => {
    // given
    const objectUser = {
      username: 'Username',
      password: 'password',
      role: 'admin',
    }

    // when
    const result = new User(objectUser)

    // then
    expect(result).to.be.instanceOf(User)
    expect(result.username).to.be.equal(objectUser.username)
    expect(result.password).to.be.equal(objectUser.password)
    expect(result.role).to.be.equal(objectUser.role)
  })

  it('should create User with role with default value', () => {
    // given
    const expectedRole = 'default'
    const objectUser = {
      username: 'Username',
      password: 'password',
    }

    // when
    const result = new User(objectUser)

    // then
    expect(result.role).to.be.equal(expectedRole)
  })
})
