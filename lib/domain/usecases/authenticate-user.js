const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

const config = require('../../config')
const {
  MissingOrInvalidCredentialsError,
  PasswordNotMatchingError,
} = require('../errors')

function checkPassword(plain, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plain, hash, (err, res) => {
      res ? resolve() : reject(new PasswordNotMatchingError())
    })
  })
}

function createAccessToken(username) {
  return jsonwebtoken.sign(
    {
      username,
    },
    config.authentication.secret,
    { expiresIn: config.authentication.tokenLifespan }
  )
}

module.exports = async function authenticateUser({
  username,
  password,
  userRepository,
}) {
  try {
    const user = await userRepository.getByUsername(username)
    await checkPassword(password, user.password)
    return createAccessToken(username)
  } catch (e) {
    throw new MissingOrInvalidCredentialsError()
  }
}
