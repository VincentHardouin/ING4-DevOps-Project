const express = require('express')
const router = express.Router()
const controller = require('./authentication-controller')

/**
 * @route GET /token
 * @group Authentication
 * @param {string} username.body.require - username for authentication  - eg: Nidourah
 * @param {string} password.body.require - password of related username
 * @returns {Users.model} 200 - User created
 * @produces application/json
 * @consumes application/json
 */
router.post('/', controller.authenticateUser)

module.exports = router
