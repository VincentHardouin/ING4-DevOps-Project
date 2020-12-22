const usecases = require('../../domain/usecases')
const {
  generateTemplateForIndex,
} = require('../../infrastructure/utils/generate-fields-for-template')

module.exports = {
  async authenticateUser(req, res) {
    const { username, password } = req.body
    try {
      const token = await usecases.authenticateUser({ username, password })
      const updateUserPasswordUrl = `/users/${username}/update-password`
      return res.render('profile', { username, token, updateUserPasswordUrl })
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
