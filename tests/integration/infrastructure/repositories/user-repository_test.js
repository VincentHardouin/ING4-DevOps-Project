const { expect, catchErr } = require('../../../test-helper')
const userRepository = require('../../../../lib/infrastructure/repositories/user-repository')
const User = require('../../../../lib/domain/models/User')
const {
  AlreadyRegisteredUsernameError,
  UserDontExistError,
} = require('../../../../lib/domain/errors')
const RedisClient = require('../../../../db/RedisClient')

describe('Integration | repositories | user-repository', () => {
  beforeEach(async () => {
    const redisClient = new RedisClient('test-user-repo')
    await redisClient.flushall()
  })

  describe('#save', () => {
    it('should be able to save user', async () => {
      // given
      const user = new User({ username: 'username', password: 'password' })

      // when
      const result = await userRepository.save(user)

      // then
      expect(result).to.be.instanceOf(User)
      expect(result).to.deep.equal(user)
    })
  })

  describe('#getByUsername', () => {
    it('should be able to return saved user', async () => {
      // given
      const user = new User({ username: 'username2', password: 'password' })
      await userRepository.save(user)

      // when
      const result = await userRepository.getByUsername(user.username)

      // then
      expect(result).to.be.instanceOf(User)
      expect(result).to.deep.equal(user)
    })

    it('should return null if not exist', async () => {
      // given
      const notExistingUsername = 'notExist'

      // when
      const result = await userRepository.getByUsername(notExistingUsername)

      // then
      expect(result).to.be.null
    })
  })

  describe('#isUsernameAvailable', () => {
    context('when username is available', () => {
      it('should be return true', async () => {
        // given
        const user = new User({ username: 'username2', password: 'password' })

        // when
        const result = await userRepository.isUsernameAvailable(user.username)

        // then
        expect(result).to.be.true
      })
    })

    context('when username is not available', () => {
      it('should return false', async () => {
        // given
        const user = new User({ username: 'username2', password: 'password' })
        await userRepository.save(user)

        // when
        const error = await catchErr(userRepository.isUsernameAvailable)(
          user.username
        )

        // then
        expect(error).to.be.instanceOf(AlreadyRegisteredUsernameError)
      })
    })
  })

  describe('#updatePassword', () => {
    context('When user is define', () => {
      it('should update the user with new password', async () => {
        // given
        const expectedPassword = 'abc'
        const user = new User({ username: 'username2', password: 'password' })
        await userRepository.save(user)

        // when
        const result = await userRepository.updatePassword(
          user.username,
          expectedPassword
        )

        // then
        expect(result.password).to.equal(expectedPassword)
      })
    })
    context('When user is not define', () => {
      it('should throw UserDontExistError', async () => {
        // given
        const expectedPassword = 'abc'
        const user = new User({ username: 'michel', password: 'password' })

        // when
        const error = await catchErr(userRepository.updatePassword)(
          user.username,
          expectedPassword
        )

        // then
        expect(error).to.be.instanceOf(UserDontExistError)
      })
    })
  })

  describe('#deleteUser', () => {
    it('should be able to delete user', async () => {
      // given
      const user = new User({ username: 'username', password: 'password' })
      await userRepository.save(user)

      // when
      const result = await userRepository.deleteUser(user.username)

      // then
      expect(result).to.be.true
    })

    it('should be able to return false if user does not exist', async () => {
      // given
      const notExistingUsername = 'abc'
      // when
      const result = await userRepository.deleteUser(notExistingUsername)

      // then
      expect(result).to.be.false
    })
  })
})
