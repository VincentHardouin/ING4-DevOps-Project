const bcrypt = require('bcrypt')
const RedisClient = require('../../../../db/RedisClient')
const NUMBER_OF_SALT_ROUNDS = 5

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, NUMBER_OF_SALT_ROUNDS, (err, hash) => {
      if (err) reject(err)
      resolve(hash)
    })
  })
}
module.exports = async function buildUser(username, password) {
  const client = new RedisClient('user-builder')
  const hashedPassword = await hashPassword(password)
  const stringifyUser = JSON.stringify({
    password: hashedPassword,
  })
  await client.set(username, stringifyUser)
  return { username, password }
}
