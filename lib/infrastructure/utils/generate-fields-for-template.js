function generateTemplateForIndex({
  usernameValue = '',
  passwordValue = '',
  signUpErrors = [],
  signInErrors = [],
  success,
} = {}) {
  return {
    title: 'DevOps Project',
    createUserUrl: '/users/',
    authenticateUserUrl: '/token/',
    signUp: {
      errors: signUpErrors,
      success,
      form: {
        fields: [
          {
            id: 'username',
            displayName: 'Username',
            optional: false,
            description: 'Username du compte que vous souhaitez créer',
            value: usernameValue,
            type: 'text',
          },
          {
            id: 'password',
            displayName: 'Password',
            optional: false,
            description: 'Mot de passe du compte que vous souhaitez créer',
            value: passwordValue,
            type: 'password',
          },
        ],
      },
    },
    signIn: {
      errors: signInErrors,
      form: {
        fields: [
          {
            id: 'username',
            displayName: 'Username',
            optional: false,
            description:
              'Username du compte auquel vous souhaitez vous connecter',
            value: usernameValue,
            type: 'text',
          },
          {
            id: 'password',
            displayName: 'Password',
            optional: false,
            description:
              'Mot de passe du compte auquel vous souhaitez vous connecter',
            value: passwordValue,
            type: 'password',
          },
        ],
      },
    },
  }
}

module.exports = {
  generateTemplateForIndex,
}
