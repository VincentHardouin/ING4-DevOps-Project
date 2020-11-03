const usecases = require('../../domain/usecases')
const {
  generateTemplateForIndex,
} = require('../../infrastructure/utils/generate-fields-for-template')

module.exports = {
  getUser(req, res) {
    const username = req.params.username
    return res.send(username)
  },

  async createUser(req, res, next) {
    const { username, password } = req.body
    try {
      const user = await usecases.createUser({ username, password })
      if (req.headers.origin.includes('localhost')) {
        return res.render(
          'index',
          generateTemplateForIndex({
            usernameValue: username,
            passwordValue: password,
            success: 'L‘utilisateur a bien été créé',
          })
        )
      }
      return res.send(user)
    } catch (err) {
      if (req.headers.origin.includes('localhost')) {
        res.render(
          'index',
          generateTemplateForIndex({
            usernameValue: username,
            passwordValue: password,
            errors: err.invalidAttributes,
          })
        )
      } else {
        next(err)
      }
    }
  },
}
