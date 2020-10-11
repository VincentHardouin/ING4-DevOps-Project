const { expect } = require('../../../test-helper')
const RedisClient = require('../../../../db/RedisClient')
const { emptyDatabase } = require('../../../../scripts/database/empty-database')

describe('Integration | Scripts | Empty-database', () => {
  let redisClient

  before(() => {
    redisClient = new RedisClient('client-test')
  })

  after(() => {
    redisClient.quit()
  })

  it('should empty all data in database', async () => {
    // given
    const key = 'test'
    await redisClient.set(key, 'test')

    // when
    await emptyDatabase()

    // then
    const result = await redisClient.get(key)
    expect(result).to.be.null
  })
})
