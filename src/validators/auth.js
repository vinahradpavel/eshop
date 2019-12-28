const { Joi, Segments } = require('celebrate');


const authPostRegistration = {
  [Segments.BODY]: Joi.object().keys({

    email: Joi.string()
      .required()
      .min(5)
      .email({ minDomainSegments: 2 }),

    password: Joi.string()
      .required()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

  }),
};

const authPostAutorization = {
  [Segments.BODY]: Joi.object().keys({

    email: Joi.string()
      .required()
      .min(5)
      .email({ minDomainSegments: 2 }),

    password: Joi.string()
      .required(),

  }),
};

module.exports = { authPostRegistration, authPostAutorization };
