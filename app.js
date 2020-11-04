require('dotenv').config()
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const sassMiddleware = require('node-sass-middleware')

const routes = require('./lib/application/')
const { handle } = require('./lib/application/error-manager')
const app = express()
const expressSwagger = require('express-swagger-generator')(app)
const config = require('./lib/config')

const createServer = () => {
  expressSwagger(config.swagger)

  // view engine setup
  app.set('views', path.join('./lib/', 'views'))
  app.set('view engine', 'hbs')

  app.use(logger('dev'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use(
    sassMiddleware({
      src: path.join('./lib/', 'public'),
      dest: path.join('./lib/', 'public'),
      indentedSyntax: true, // true = .sass and false = .scss
      sourceMap: true,
    })
  )
  app.use(express.static(path.join('./lib/', 'public')))

  app.use('/', routes)

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404))
  })

  // error handler
  // eslint-disable-next-line no-unused-vars
  app.use(function (err, req, res, next) {
    handle(err, res)
    // set locals, only providing error in development
    // res.locals.message = err.message
    // res.locals.error = req.app.get('env') === 'development' ? err : {}
    //
    // // render the error page
    // res.status(err.status || 500)
    // res.render('error')
  })

  app.set('port', config.port)

  return app
}

module.exports = createServer
