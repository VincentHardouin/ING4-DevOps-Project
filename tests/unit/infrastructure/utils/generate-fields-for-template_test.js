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
        authenticateUserUrl: '/token/',
        signUp: {
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
        },
        signIn: {
          errors: [],
          form: {
            fields: [
              {
                description:
                  'Username du compte auquel vous souhaitez vous connecter',
                displayName: 'Username',
                id: 'username',
                optional: false,
                type: 'text',
                value: '',
              },
              {
                description:
                  'Mot de passe du compte auquel vous souhaitez vous connecter',
                displayName: 'Password',
                id: 'password',
                optional: false,
                type: 'password',
                value: '',
              },
            ],
          },
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
        signUpErrors: [{ error: 'toto' }, { error: 'toto' }],
        signInErrors: [{ error: 'tota' }, { error: 'tota' }],
        success: 'toto',
      }
      const expectedResult = {
        title: 'DevOps Project',
        createUserUrl: '/users/',
        authenticateUserUrl: '/token/',
        signUp: {
          errors: object.signUpErrors,
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
        },
        signIn: {
          errors: object.signInErrors,
          form: {
            fields: [
              {
                description:
                  'Username du compte auquel vous souhaitez vous connecter',
                displayName: 'Username',
                id: 'username',
                optional: false,
                type: 'text',
                value: 'Toto',
              },
              {
                description:
                  'Mot de passe du compte auquel vous souhaitez vous connecter',
                displayName: 'Password',
                id: 'password',
                optional: false,
                type: 'password',
                value: 'Toto',
              },
            ],
          },
        },
      }

      // when
      const result = generateTemplateForIndex(object)

      // then
      expect(result).to.deep.equal(expectedResult)
    })
  })
})
