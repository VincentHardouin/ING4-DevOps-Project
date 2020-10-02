const path = require('path')

module.exports = (function () {
  const config = {
    rootPath: path.normalize(__dirname + '/..'),

    port: parseInt(process.env.PORT, 10) || 3000,

    environment: process.env.NODE_ENV || 'development',

    express: {
      options: {},
    },

    swagger: {
      swaggerDefinition: {
        info: {
          description: 'This is a sample server',
          title: 'Swagger',
          version: '1.0.0',
        },
        host: 'localhost:3000',
        basePath: '/v1',
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
      files: ['.lib/routes/**/*.js'], //Path to the API handle folder
    },
  }

  if (process.env.NODE_ENV === 'test') {
    config.port = 0
  }

  return config
})()
