module.exports = {
  getUser(req, res) {
    const username = req.params.username
    return res.send(username)
  },
}
