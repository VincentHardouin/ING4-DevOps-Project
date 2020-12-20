const usecases = require('../../domain/usecases')
const {
  generateTemplateForIndex,
} = require('../../infrastructure/utils/generate-fields-for-template')

module.exports = {
  getUser(req, res) {
    const username = req.params.username
    return res.send(username)
  },

  async createUser(req, res) {
    const { username, password } = req.body
    try {
      await usecases.createUser({ username, password })
      return res.render(
        'index',
        generateTemplateForIndex({
          usernameValue: username,
          passwordValue: password,
          success: 'L‘utilisateur a bien été créé',
        })
      )
    } catch (err) {
      res.status(422).render(
        'index',
        generateTemplateForIndex({
          usernameValue: username,
          passwordValue: password,
          signUpErrors: err.invalidAttributes,
        })
      )
    }
  },
  async updatePassword(req, res) {
    const { password, token } = req.body
    try {
      await usecases.updatePassword({ token, password })
      return res.render(
        'index',
        generateTemplateForIndex({
          usernameValue: username,
          passwordValue: password,
          success: 'Le mot de passe a bien été mis à jour',
        })
      )
    } catch (err) {
      res.status(422).render(
        'index',
        generateTemplateForIndex({
          usernameValue: username,
          passwordValue: password,
          signUpErrors: err.invalidAttributes,
        })
      )
    }
  },

  async deleteUser(req, res) {
    const { token } = req.body
    await usecases.deleteUser(token)
    return res.render(
      'index',
      generateTemplateForIndex({ success: 'L‘utilisateur a bien été supprimé' })
    )
  },
}
