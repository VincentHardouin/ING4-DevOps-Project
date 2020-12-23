const RedisClient = require('../../../db/RedisClient')
const client = new RedisClient('user-repository')
const User = require('../../domain/models/User')
const {
  AlreadyRegisteredUsernameError,
  UserDontExistError,
} = require('../../domain/errors')

async function save(user) {
  const stringifyUser = JSON.stringify({
    password: user.password,
    role: user.role,
  })
  await client.set(user.username, stringifyUser)
  const savedUser = await client.get(user.username)
  return new User({ username: user.username, ...JSON.parse(savedUser) })
}

async function getByUsername(username) {
  const result = await client.get(username)
  return result ? new User({ username, ...JSON.parse(result) }) : null
}

async function isUsernameAvailable(username) {
  const result = await client.get(username)
  if (result) throw new AlreadyRegisteredUsernameError()
  return !result
}

async function updatePassword(username, newPassword) {
  const user = await getByUsername(username)
  if (!user) {
    throw new UserDontExistError()
  }
  user.password = newPassword
  return save(user)
}

async function deleteUser(username) {
  const result = await client.get(username)
  if (!result) return false
  await client.delete(username)
  return true
}

module.exports = {
  save,
  getByUsername,
  isUsernameAvailable,
  updatePassword,
  deleteUser,
}
