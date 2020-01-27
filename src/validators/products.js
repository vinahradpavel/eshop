const { Joi, Segments } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);


const productsPost = {
  [Segments.BODY]: Joi.object().keys({

    name: Joi.string()
      .required()
      .min(2)
      .max(50),

    description: Joi.string()
      .required()
      .min(10),

    price: Joi.number()
      .required()
      .min(0.01)
      .precision(2),

    subCategory: Joi.objectId()
      .required(),

    brand: Joi.objectId()
      .required(),

    other: Joi.string()
      .min(10),

  }),
};

const productsDelete = {
  [Segments.PARAMS]: Joi.object().keys({

    id: Joi.objectId()
      .required(),

  }),
};

const productsUpdate = {

  [Segments.PARAMS]: Joi.object().keys({

    id: Joi.objectId()
      .required(),

  }),

  [Segments.BODY]: Joi.object().keys({

    name: Joi.string()
      .required()
      .min(2)
      .max(50),

    description: Joi.string()
      .required()
      .min(10),

    price: Joi.number()
      .required()
      .min(0.01)
      .precision(2),

    subCategory: Joi.objectId()
      .required(),

    brand: Joi.objectId()
      .required(),

    other: Joi.string()
      .min(10),

  }),
};

const productsGet = {
  [Segments.QUERY]: Joi.object().keys({

    name: Joi.string()
      .default(''),

    description: Joi.string()
      .default(''),

    minPrice: Joi.number()
      .default(0),

    maxPrice: Joi.number()
      .default(999999),

    subCategory: Joi.objectId(),

    brand: Joi.objectId(),

    other: Joi.string()
      .default(''),

    page: Joi.number()
      .default(1),

    limit: Joi.number()
      .default(10),

    offset: Joi.number()
      .default(0),

  }),
};


module.exports = {
  productsPost,
  productsDelete,
  productsUpdate,
  productsGet,
};
