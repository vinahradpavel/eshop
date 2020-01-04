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
  [Segments.QUERY]: Joi.object().keys({

    name: Joi.string()
      .required()
      .min(2)
      .max(50),

  }),
};

const subCategoriesUpdate = {
  [Segments.QUERY]: Joi.object().keys({
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
