const usecases = require('../../domain/usecases')

module.exports = {
  getUser(req, res) {
    const username = req.params.username
    return res.send(username)
  },

  async createUser(req, res, next) {
    const { username, password } = req.body
    try {
      const user = await usecases.createUser({ username, password })
      return res.send(user)
    } catch (err) {
      next(err)
    }
  },
}
