const usecases = require('../../domain/usecases')
const {
  generateTemplateForIndex,
} = require('../../infrastructure/utils/generate-fields-for-template')

module.exports = {
  async authenticateUser(req, res) {
    const { username, password } = req.body
    try {
      const token = await usecases.authenticateUser({ username, password })
      return res.render('profile', { username, token })
    } catch (err) {
      res.status(401).render(
        'index',
        generateTemplateForIndex({
          usernameValue: username,
          passwordValue: password,
          signInErrors: err.message,
        })
      )
    }
  },
}
