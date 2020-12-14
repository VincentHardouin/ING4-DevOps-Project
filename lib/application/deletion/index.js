const express = require('express')
const router = express.Router()
const user = require('./deletion-controller')

/**
 * @typedef Users
 * @property {string} username.required - username of person making request - eg: Nidourah
 * @property {string} password - only for POST
 * @property {string} role
 */

/**
 * @route POST /users
 * @group Users
 * @param {string} username.body.require - username to create account - eg: Nidourah
 * @param {string} password.body.require - account password
 * @returns {Users.model} 200 - User created
 * @produces application/json
 * @consumes application/json
 */
router.delete('/username', user.getUser)

module.exports = router