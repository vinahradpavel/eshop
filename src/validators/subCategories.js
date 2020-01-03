const { Joi, Segments } = require('celebrate');


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


module.exports = { subCategoriesPost, subCategoriesDelete };
