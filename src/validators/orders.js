const { Joi, Segments } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const { STATUS, PAYMENTMETHODS } = require('../constants/orders');

const { NEWORDER } = STATUS;
const { CASH, CASHLESS, COMBINED } = PAYMENTMETHODS;

const ordersPost = {
  [Segments.BODY]: Joi.object().keys({

    orderNumber: Joi.number(),

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

    orderInformation: Joi.string()
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

    paymentMethod: Joi.string()
      .valid(CASH, CASHLESS, COMBINED)
      .required(),

    totalPrice: Joi.number(),

  }),
};

const ordersGet = {
  [Segments.QUERY]: Joi.object().keys({

    orderNumber: Joi.number(),

    status: Joi.string()
      .default(''),

    name: Joi.string()
      .default(''),

    surname: Joi.string()
      .default(''),

    dateDelivery: Joi.date(),

    page: Joi.number()
      .default(1),

    limit: Joi.number()
      .default(10),

    offset: Joi.number()
      .default(0),

  }),
};

module.exports = {
  ordersPost,
  ordersGet,
};
