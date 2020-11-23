const express = require('express')
const router = express.Router()

const usersRouter = require('./users/index')
const authenticationRouter = require('./authentication/index')

const {
  generateTemplateForIndex,
} = require('../infrastructure/utils/generate-fields-for-template')

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', generateTemplateForIndex({}))
})

router.use('/users', usersRouter)
router.use('/token', authenticationRouter)

module.exports = router
