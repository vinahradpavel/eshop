const { Joi, Segments } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);


const basketPost = {
  [Segments.BODY]: Joi.object().keys({


    products: Joi.array().items({
      idProduct: Joi.objectId(),
      count: Joi.number().default(1),
    }),

  }),
};

const basketDelete = {
  [Segments.PARAMS]: Joi.object().keys({

    id: Joi.objectId()
      .required(),
  }),
};

module.exports = {
  basketPost,
  basketDelete,
};
