const { Joi, Segments } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const customersGet = {
  [Segments.QUERY]: Joi.object().keys({

    page: Joi.number()
      .default(1),

    limit: Joi.number()
      .default(10),

    offset: Joi.number()
      .default(0),

  }),
};

const customersGetById = {
  [Segments.PARAMS]: Joi.object().keys({

    id: Joi.number(),

  }),
  [Segments.QUERY]: Joi.object().keys({

    page: Joi.number()
      .default(1),

    limit: Joi.number()
      .default(10),

    offset: Joi.number()
      .default(0),

  }),
};

module.exports = {
  customersGet,
  customersGetById,
};
