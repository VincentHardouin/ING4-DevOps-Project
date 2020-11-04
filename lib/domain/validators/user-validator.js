const Joi = require('joi')
const { EntityValidationError } = require('../errors')

const pattern = new RegExp('^(?=.*[a-zà-ÿ])(?=.*[A-ZÀ-ß])(?=.*[0-9]).{8,}$')
const validationConfiguration = { abortEarly: false, allowUnknown: true }

const userValidationJoiSchema = Joi.object({
  username: Joi.string().required().max(255).messages({
    'string.empty': 'Votre identifiant n’est pas renseigné.',
    'string.max': 'Votre identifiant ne doit pas dépasser les 255 caractères.',
  }),

  password: Joi.string().pattern(pattern).required().max(255).messages({
    'string.empty': 'Votre mot de passe n’est pas renseigné.',
    'string.pattern.base':
      'Votre mot de passe doit contenir 8 caractères au minimum et comporter au moins une majuscule, une minuscule et un chiffre.',
    'string.max': 'Votre mot de passe ne doit pas dépasser les 255 caractères.',
  }),
})
  .required()
  .messages({
    'any.required': 'Aucun champ n‘est renseigné.',
  })

module.exports = {
  validate({ user }) {
    const { error } = userValidationJoiSchema.validate(user, {
      ...validationConfiguration,
    })
    if (error) {
      throw EntityValidationError.fromJoiErrors(error.details)
    }
    return true
  },
}
