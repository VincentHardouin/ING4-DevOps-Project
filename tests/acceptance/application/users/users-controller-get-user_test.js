const { expect, request } = require('../../../test-helper')
const createServer = require('../../../../app')

describe('Acceptance | Controller | users-controller', () => {
  let server

  beforeEach(async () => {
    server = await createServer()
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
})
