const usecases = require('../../domain/usecases')
const {
  generateTemplateForIndex,
} = require('../../infrastructure/utils/generate-fields-for-template')

module.exports = {
  async authenticateUser(req, res, next) {
    const { username, password } = req.body
    try {
      const token = await usecases.authenticateUser({ username, password })
      if (req.headers.origin.includes('localhost')) {
        return res.render('profile', { username, token })
      }
      return res.send(token)
    } catch (err) {
      if (req.headers.origin.includes('localhost')) {
        res.render(
          'index',
          generateTemplateForIndex({
            usernameValue: username,
            passwordValue: password,
            signInErrors: err.message,
          })
        )
      } else {
        next(err)
      }
    }
  },
}
