const express = require('express')
const router = express.Router()

const usersRouter = require('./users/index')

const {
  generateTemplateForIndex,
} = require('../infrastructure/utils/generate-fields-for-template')

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', generateTemplateForIndex({}))
})

router.use('/users', usersRouter)

module.exports = router
