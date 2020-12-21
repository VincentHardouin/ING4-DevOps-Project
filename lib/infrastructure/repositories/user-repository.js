const RedisClient = require('../../../db/RedisClient')
const client = new RedisClient('user-repository')
const User = require('../../domain/models/User')
const { AlreadyRegisteredUsernameError } = require('../../domain/errors')

module.exports = {
  async save(user) {
    const stringifyUser = JSON.stringify({
      password: user.password,
      role: user.role,
    })
    await client.set(user.username, stringifyUser)
    const savedUser = await client.get(user.username)
    return new User({ username: user.username, ...JSON.parse(savedUser) })
  },

  async getByUsername(username) {
    const result = await client.get(username)
    return result ? new User({ username, ...JSON.parse(result) }) : null
  },

  async isUsernameAvailable(username) {
    const result = await client.get(username)
    if (result) throw new AlreadyRegisteredUsernameError()
    return !result
  },

  async delete(username) {
    const result = await client.get(username)
    if(!result) return false
    await client.delete(username)
    return true
  },
}
