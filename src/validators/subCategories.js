const { Joi, Segments } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);


const subCategoriesPost = {
  [Segments.BODY]: Joi.object().keys({

    name: Joi.string()
      .required()
      .min(2)
      .max(50),

  }),
};

const subCategoriesDelete = {
  [Segments.PARAMS]: Joi.object().keys({

    id: Joi.objectId()
      .required(),

  }),
};

const subCategoriesUpdate = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.objectId(),
  }),
  [Segments.BODY]: Joi.object().keys({

    name: Joi.string()
      .required()
      .min(2)
      .max(50),
  }),
};

module.exports = { subCategoriesPost, subCategoriesDelete, subCategoriesUpdate };
