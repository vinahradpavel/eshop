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
  [Segments.PARAMS]: Joi.object().keys({

    id: Joi.objectId()
      .required(),
  }),
};

const brandsUpdate = {
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

const brandsGet = {
  [Segments.QUERY]: Joi.object().keys({

    name: Joi.string()
      .default(''),

    page: Joi.number().default(1),

    limit: Joi.number().default(10),

    offset: Joi.number().default(0),

  }),
};


module.exports = {
  brandsPost, brandsDelete, brandsUpdate, brandsGet,
};
