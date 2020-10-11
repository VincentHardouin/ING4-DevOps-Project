require('dotenv').config()
const redis = require('redis')
const { promisify } = require('util')
const logger = require('../lib/infrastructure/logger')
const { database } = require('../lib/config')

module.exports = class RedisClient {
  constructor(clientName) {
    this._clientName = clientName

    const options = { db: database.redis.database }
    this._client = redis.createClient(database.redis.url, options)

    this._client.on('connect', () =>
      logger.info({ redisClient: this._clientName }, 'Connected to server')
    )
    this._client.on('end', () =>
      logger.info({ redisClient: this._clientName }, 'Disconnected from server')
    )
    this._client.on('error', (err) =>
      logger.warn({ redisClient: this._clientName, err }, 'Error encountered')
    )

    this.get = promisify(this._client.get).bind(this._client)
    this.set = promisify(this._client.set).bind(this._client)
    this.ping = promisify(this._client.ping).bind(this._client)
    this.flushall = promisify(this._client.flushall).bind(this._client)
  }

  on(event, callback) {
    this._client.on(event, callback)
  }

  quit() {
    this._client.quit()
  }
}
