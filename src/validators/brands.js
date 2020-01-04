const { Joi, Segments } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);


const brandsPost = {
  [Segments.BODY]: Joi.object().keys({

    name: Joi.string()
      .required()
      .min(2)
      .max(50),

  }),
};

const brandsDelete = {
  [Segments.QUERY]: Joi.object().keys({

    name: Joi.string()
      .required()
      .min(2)
      .max(50),

  }),
};

const brandsUpdate = {
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


module.exports = { brandsPost, brandsDelete, brandsUpdate };
