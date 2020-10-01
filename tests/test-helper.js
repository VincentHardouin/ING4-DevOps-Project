// Chai
const chai = require('chai')
const expect = chai.expect

// Chai-HTTP
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

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
}
