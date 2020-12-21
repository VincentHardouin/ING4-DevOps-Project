const settings = require('../../config')
const jsonwebtoken = require('jsonwebtoken')

function _getDecodedToken(token) {
  try {
    return jsonwebtoken.verify(token, settings.authentication.secret)
  } catch (err) {
    return false
  }
}

module.exports = async function deleteUser({ token, userRepository }) {
  const decodedToken = _getDecodedToken(token)
  if (!decodedToken) return false
  await userRepository.delete(decodedToken.username)
  return true
}
