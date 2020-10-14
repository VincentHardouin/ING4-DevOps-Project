const bcrypt = require('bcrypt')
const User = require('../models/User')
const userValidator = require('../validators/user-validator')
const {
  AlreadyRegisteredUsernameError,
  EntityValidationError,
} = require('../errors')

const NUMBER_OF_SALT_ROUNDS = 5

function _manageUsernameAvailabilityError(error) {
  return _manageError(
    error,
    AlreadyRegisteredUsernameError,
    'username',
    'Cet identifiant est déjà enregistré, connectez-vous.'
  )
}

function _manageError(error, errorType, attribute, message) {
  if (error instanceof errorType) {
    return new EntityValidationError({
      invalidAttributes: [{ attribute, message }],
    })
  }

  throw error
}

function _hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, NUMBER_OF_SALT_ROUNDS, (err, hash) => {
      if (err) reject(err)
      resolve(hash)
    })
  })
}

async function _validateData(user, userRepository) {
  const userValidationErrors = []
  try {
    await userValidator.validate({ user })
  } catch (err) {
    userValidationErrors.push(err)
  }
  try {
    if (user.username) {
      await userRepository.isUsernameAvailable(user.username)
    }
  } catch (err) {
    userValidationErrors.push(_manageUsernameAvailabilityError(err))
  }

  if (userValidationErrors.some((error) => error instanceof Error)) {
    throw EntityValidationError.fromMultipleEntityValidationErrors(
      userValidationErrors
    )
  }

  return true
}

module.exports = async function createUser({
  username,
  password,
  userRepository,
}) {
  const user = new User({ username, password })
  const isValid = await _validateData(user, userRepository)
  if (isValid) {
    const hashedPassword = await _hashPassword(user.password)
    return userRepository.save(new User({ username, password: hashedPassword }))
  }
}
