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

  async deleteUser(req, res) {
        const { username } = req.params.username
        await usecases.deleteUser(username)
        return res.render('index', generateTemplateForIndex({}))
    },
}
