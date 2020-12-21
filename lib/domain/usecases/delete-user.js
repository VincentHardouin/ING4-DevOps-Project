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
      const user = await userRepository.getByUsername(username)
      userRepository.delete(user)
    }