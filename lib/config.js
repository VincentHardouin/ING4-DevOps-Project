require('dotenv').config()
const path = require('path')

function isFeatureEnabled(environmentVariable) {
  return environmentVariable === 'true'
}

module.exports = (function () {
  const config = {
    rootPath: path.normalize(__dirname + '/..'),

    port: parseInt(process.env.PORT, 10) || 3000,

    environment: process.env.NODE_ENV || 'development',

    express: {
      options: {},
    },

    logging: {
      enabled: isFeatureEnabled(process.env.LOG_ENABLED),
      colorEnabled: process.env.NODE_ENV === 'development',
      logLevel: process.env.LOG_LEVEL || 'info',
    },

    swagger: {
      swaggerDefinition: {
        info: {
          description: 'This is a sample server',
          title: 'Swagger',
          version: '1.0.0',
        },
        host: 'localhost:3000',
        basePath: '/',
        produces: ['application/json', 'application/xml'],
        schemes: ['http', 'https'],
        securityDefinitions: {
          JWT: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: '',
          },
        },
      },
      basedir: __dirname, //app absolute path
      files: ['./application/**/*.js'], //Path to the API handle folder
    },

    database: {
      redis: {
        url: process.env.DATABASE_REDIS_URL,
        database: 0,
      },
    },
  }

  if (process.env.NODE_ENV === 'test') {
    config.port = 0

    config.logging.enabled = false

    config.database.redis.database = 1
  }
  return config
})()
