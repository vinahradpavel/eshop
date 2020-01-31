const { Joi, Segments } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);


const basketPost = {
  [Segments.BODY]: Joi.object().keys({

    products: Joi.array().items({
      idProduct: Joi.objectId()
        .required(),
      count: Joi.number()
        .required()
        .default(1),
    }),

  }),
};


module.exports = {
  basketPost,

};
