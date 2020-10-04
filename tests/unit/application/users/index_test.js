const { expect, request } = require('../../../test-helper')
const express = require('express')
const moduleUnderTest = require('../../../../lib/application/users/index')

describe('Unit | Router | user-router', () => {
  let server
  describe('GET /users/:username', () => {
    beforeEach(() => {
      server = express()
      server.use('/users', moduleUnderTest)
    })

    it('should exist', async () => {
      // given
      const url = '/users/username'

      // when
      const response = await request(server).get(url)

      // then
      expect(response).to.have.status(200)
    })
  })
})
