const { expect, request } = require('../../../test-helper')
const createServer = require('../../../../app')

describe('Acceptance | Controller | users-controller', () => {
  let server

  beforeEach(() => {
    server = createServer()
  })

  describe('getUser', () => {
    it('should possible to get user', async () => {
      // given
      const url = '/users/username'

      // when
      const response = await request(server).get(url)

      // then
      expect(response).to.have.status(200)
    })
  })

  describe('createUser', () => {
    it('should possible to create user', async () => {
      // given
      const url = '/users/'

      // when
      const response = await request(server)
        .post(url)
        .set('content-type', 'application/json')
        .set('origin', 'chai')
        .send({ username: 'nidourah', password: 'Pa$$w0rd' })

      // then
      expect(response).to.have.status(200)
    })

    context('When body are not provide', () => {
      it('should return 422', async () => {
        // given
        const url = '/users/'

        // when
        const response = await request(server)
          .post(url)
          .set('content-type', 'application/json')
          .set('origin', 'chai')
          .send({ foo: 'bar' })

        // then
        expect(response).to.have.status(422)
      })
    })
  })
})
