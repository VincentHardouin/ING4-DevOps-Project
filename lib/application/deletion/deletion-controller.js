const usecases = require('../../domain/usecases')
const {
  generateTemplateForIndex,
} = require('../../infrastructure/utils/generate-fields-for-template')

module.exports = {
  getUser(req, res) {
    const username = req.params.username
    return res.send(username)
  },

  async delete(req, res) {
        const { username } = req.params;
        db.collection('username').findOneAndDelete({username: username}, 
        (err, result) => {
        if (err) return res.send(500, err)
        console.log('got deleted');
        res.redirect('/');
        });
    },
}