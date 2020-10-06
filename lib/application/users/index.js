const express = require('express')
const router = express.Router()
const user = require('./user-controller')

/* GET users listing. */
router.get('/:username', user.getUser)

module.exports = router
