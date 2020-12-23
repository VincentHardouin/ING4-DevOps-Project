const faker = require('faker')

module.exports = {
  generateRandomData(userContext, events, done) {
    const username = faker.internet.userName()
    const password = faker.internet.password()
    userContext.vars.username = username
    userContext.vars.password = password
    return done()
  },
}
