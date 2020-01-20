const { Joi, Segments } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const { STATUS, PAYMENTMETHODS } = require('../constants/orders');

const { NEWORDER } = STATUS;
const { CASH, CASHLESS, COMBINED } = PAYMENTMETHODS;

const ordersPost = {
  [Segments.BODY]: Joi.object().keys({

    customer: Joi.objectId(),

    products: Joi.array().items({
      idProduct: Joi.objectId()
        .required(),
      count: Joi.number()
        .required()
        .default(1),
    }),

    orderDate: Joi.date()
      .default(Date.now()),

    status: Joi.string()
      .default(NEWORDER),

    orderInforamtion: Joi.string()
      .min(10)
      .max(250)
      .default(''),

    deliveryInformation: Joi.object().keys({
      name: Joi.string()
        .min(2)
        .max(50)
        .required(),
      surname: Joi.string()
        .min(2)
        .max(50)
        .required(),
      country: Joi.string()
        .min(2)
        .max(50)
        .required(),
      city: Joi.string()
        .min(2)
        .max(50)
        .required(),
      address: Joi.string()
        .min(2)
        .max(100)
        .required(),
      dateDelivery: Joi.date(),
    }),

    seller: Joi.objectId(),

    paymentMetod: Joi.string()
      .valid(CASH, CASHLESS, COMBINED)
      .required(),

    totalPrice: Joi.number(),

  }),
};

module.exports = {
  ordersPost,
};
