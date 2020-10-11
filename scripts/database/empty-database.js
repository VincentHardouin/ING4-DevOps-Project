const RedisClient = require('../../db/RedisClient')

function emptyDatabase() {
  const client = new RedisClient('database-agent')
  return client.flushall()
}

function main() {
  console.log('Emptying all database')
  emptyDatabase().then(() => {
    console.log('Done!')
    process.exit(0)
  })
}

/*=================== tests =============================*/

if (process.env.NODE_ENV !== 'test') {
  main()
} else {
  module.exports = {
    emptyDatabase,
  }
}
