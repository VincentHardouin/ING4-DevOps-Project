function generateTemplateForIndex({
  usernameValue = '',
  passwordValue = '',
  errors = [],
  success,
} = {}) {
  return {
    title: 'DevOps Project',
    createUserUrl: '/users/',
    errors,
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
  }
}

module.exports = {
  generateTemplateForIndex,
}
