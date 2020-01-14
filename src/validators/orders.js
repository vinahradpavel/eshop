const { Joi, Segments } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);


const ordersPost = {
  [Segments.BODY]: Joi.object().keys({

    customer: Joi.objectId()
      .required(),

    products: Joi.array().items({ idProduct: Joi.objectId(), count: Joi.number().default(1) }),

    dateOrder: Joi.date()
      .default(Date.now()),

    totalPrice: Joi.number()
      .min(0.01)
      .precision(2),

  }),
};

module.exports = {
  ordersPost,
};
