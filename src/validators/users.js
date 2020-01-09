const { Joi, Segments } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const { ROLES } = require('../constants/users');

const { ADMIN, SELLER, CUSTOMER } = ROLES;

const usersGet = {
  [Segments.QUERY]: Joi.object().keys({

    name: Joi.string()
      .default(''),

    surname: Joi.string()
      .default(''),

    isActive: Joi.boolean()
      .default([true, false]),

    email: Joi.string()
      .default(''),

    role: Joi.string()
      .default([ADMIN, SELLER, CUSTOMER]),

  }),
};


module.exports = { usersGet };
