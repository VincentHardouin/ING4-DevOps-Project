const { expect } = require('../test-helper')
const config = require('../../lib/config')

describe('Unit | Config', () => {
  it('should load config', () => {
    const expectedPortOnTest = 0
    expect(config.port).to.equal(expectedPortOnTest)
  })
})
