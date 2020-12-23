const express = require('express')
const router = express.Router()
const user = require('./user-controller')

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
 * @returns {Users.model} 201 - User created
 * @produces application/json
 * @consumes application/json
 */
router.post('/', user.createUser)

router.get('/:username', user.getUser)

/**
 * @route POST /:username/update-password
 * @group Users
 * @param {string} token - token of connected user
 * @param {string} password.body.require - new account password
 * @returns {Users.model} 200 - OK
 * @produces application/json
 * @consumes application/json
 */
router.post('/:username/update-password', user.updatePassword)

router.post('/:username/delete', user.deleteUser)

module.exports = router
