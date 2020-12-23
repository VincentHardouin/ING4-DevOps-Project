const bcrypt = require('bcrypt')
const settings = require('../../config')
const jsonwebtoken = require('jsonwebtoken')

const NUMBER_OF_SALT_ROUNDS = 5

function _hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, NUMBER_OF_SALT_ROUNDS, (err, hash) => {
      if (err) reject(err)
      resolve(hash)
    })
  })
}

function _getDecodedToken(token) {
  try {
    return jsonwebtoken.verify(token, settings.authentication.secret)
  } catch (err) {
    return false
  }
}

module.exports = async function updateUserPassword({
  token,
  password,
  userRepository,
}) {
  const { username } = _getDecodedToken(token)
  const hashedPassword = await _hashPassword(password)
  return userRepository.updatePassword(username, hashedPassword)
}
