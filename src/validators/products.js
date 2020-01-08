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
      .min(0.00),

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


module.exports = { productsPost, productsDelete };
