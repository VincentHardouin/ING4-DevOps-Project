const dependencies = {
  userRepository: require('../../infrastructure/repositories/user-repository'),
}

const {
  injectDependencies,
} = require('../../infrastructure/utils/dependency-injection')

module.exports = injectDependencies(
  {
    createUser: require('./create-user'),
    authenticateUser: require('./authenticate-user'),
    updatePassword: require('./update-user-password'),
    deleteUser: require('./delete-user'),
  },
  dependencies
)
