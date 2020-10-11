const { expect } = require('../../test-helper')
const RedisClient = require('../../../db/RedisClient')

describe('Integration | db | RedisClient', () => {
  let redisClient
  before(() => {
    // given
    const clientName = 'test-db'

    // when
    redisClient = new RedisClient(clientName)
  })

  after(() => {
    redisClient.quit()
  })

  it('should connect to Redis', () => {
    // then
    redisClient.on('connect', () => {
      expect(redisClient._client.connected).to.equal(true)
    })
  })

  it('should use database 1 on test', () => {
    // then
    expect(redisClient._client.selected_db).to.equal(1)
  })
})
