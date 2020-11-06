// Chai
const chai = require('chai')
const expect = chai.expect

// Chai-HTTP
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const request = chai.request

// Sinon
const sinon = require('sinon')
chai.use(require('sinon-chai'))

const RedisClient = require('../db/RedisClient')

afterEach(async function () {
  sinon.restore()
  const db = new RedisClient('test')
  await db.flushall()
})

function catchErr(promiseFn, ctx) {
  return async (...args) => {
    try {
      await promiseFn.call(ctx, ...args)
      return 'should have thrown an error'
    } catch (err) {
      return err
    }
  }
}

module.exports = {
  chai,
  expect,
  catchErr,
  sinon,
  request,
}
