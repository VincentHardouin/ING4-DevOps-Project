const { databaseBuilder, expect, request } = require('../../../test-helper')
const createServer = require('../../../../app')

describe('Acceptance | Controller | users-controller', () => {
  let server

  beforeEach(() => {
    server = createServer()
  })

  describe('authenticateUser', () => {
    it('should possible to authenticate user', async () => {
      // given
      const username = 'nidourah'
      const password = 'Pa$$w0rd'
      await databaseBuilder.buildUser(username, password)
      const url = '/token'

      // when
      const response = await request(server)
        .post(url)
        .set('content-type', 'application/json')
        .set('origin', 'chai')
        .send({ username, password })

      // then
      expect(response).to.have.status(200)
    })

    context('When usrname or password are incorrect', () => {
      it('should return 401', async () => {
        // given
        const url = '/token'

        // when
        const response = await request(server)
          .post(url)
          .set('content-type', 'application/json')
          .set('origin', 'chai')
          .send({ username: 'bar' })

        // then
        expect(response).to.have.status(401)
      })
    })
  })
})
