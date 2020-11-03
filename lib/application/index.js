const express = require('express')
const router = express.Router()

const usersRouter = require('./users/index')

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Express' })
})

router.use('/users', usersRouter)

module.exports = router
