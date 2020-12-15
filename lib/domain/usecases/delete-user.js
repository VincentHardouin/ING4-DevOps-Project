const User = require('../models/User')
const userValidator = require('../validators/user-validator')
const {
  AlreadyRegisteredUsernameError,
  EntityValidationError,
} = require('../errors')


module.exports = async function deleteUser({
      username,
      userRepository,
    }) {
      userRepository.delete(username)
    }