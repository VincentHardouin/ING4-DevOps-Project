const { expect } = require('../../../test-helper')
const {
  generateTemplateForIndex,
} = require('../../../../lib/infrastructure/utils/generate-fields-for-template')

describe('Unit | Utils | generate-fields-for-template', () => {
  describe('#generateTemplateForIndex', () => {
    it('should return generated template with default value when no argument are provide', () => {
      // given
      const expectedResult = {
        title: 'DevOps Project',
        createUserUrl: '/users/',
        errors: [],
        success: undefined,
        form: {
          fields: [
            {
              id: 'username',
              displayName: 'Username',
              optional: false,
              description: 'Username du compte que vous souhaitez créer',
              value: '',
              type: 'text',
            },
            {
              id: 'password',
              displayName: 'Password',
              optional: false,
              description: 'Mot de passe du compte que vous souhaitez créer',
              value: '',
              type: 'password',
            },
          ],
        },
      }

      // when
      const result = generateTemplateForIndex()

      // then
      expect(result).to.deep.equal(expectedResult)
    })

    it('should return generated template with provided arguments', () => {
      // given
      const object = {
        usernameValue: 'Toto',
        passwordValue: 'Toto',
        errors: [{ error: 'toto' }, { error: 'toto' }],
        success: 'toto',
      }
      const expectedResult = {
        title: 'DevOps Project',
        createUserUrl: '/users/',
        errors: object.errors,
        success: object.success,
        form: {
          fields: [
            {
              id: 'username',
              displayName: 'Username',
              optional: false,
              description: 'Username du compte que vous souhaitez créer',
              value: object.usernameValue,
              type: 'text',
            },
            {
              id: 'password',
              displayName: 'Password',
              optional: false,
              description: 'Mot de passe du compte que vous souhaitez créer',
              value: object.passwordValue,
              type: 'password',
            },
          ],
        },
      }

      // when
      const result = generateTemplateForIndex(object)

      // then
      expect(result).to.deep.equal(expectedResult)
    })
  })
})
