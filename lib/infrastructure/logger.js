const bunyan = require('bunyan')
const { logging } = require('../config')

const logger = bunyan.createLogger({ name: 'devops-project-api', streams: [] })

if (logging.enabled) {
  logger.addStream({
    name: 'standard-output',
    stream: process.stdout,
    level: logging.logLevel,
  })

  logger.debug('DEBUG logs enabled')
  logger.trace('TRACE logs enabled')
}

module.exports = logger
