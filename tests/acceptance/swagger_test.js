const { chai, expect } = require('../test-helper')
const createServer = require('../../app')

describe('Acceptance | Swagger', () => {
  let server

  beforeEach(async () => {
    server = await createServer()
  })

  describe('GET /api-docs', () => {
    it('should possible to show docs', () => {
      chai
        .request(server)
        .get('/api-docs')
        .then((res) => {
          expect(res).to.have.status(200)
        })
        .catch((err) => {
          throw err
        })
    })
  })
})
