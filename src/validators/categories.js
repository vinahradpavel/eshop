const { Joi, Segments } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);


const categoriesPost = {
  [Segments.BODY]: Joi.object().keys({

    name: Joi.string()
      .required()
      .min(2)
      .max(50),

    description: Joi.string()
      .min(10),

    subCategories: Joi.array().items(Joi.objectId()),

  }),
};

const categoriesUpdate = {
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
      .min(10),

    subCategories: Joi.array().items(Joi.objectId()),

  }),
};

const categoriesDelete = {
  [Segments.PARAMS]: Joi.object().keys({

    id: Joi.objectId()
      .required(),

  }),
};

module.exports = { categoriesPost, categoriesDelete, categoriesUpdate };
