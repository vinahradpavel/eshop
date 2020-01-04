const { Joi, Segments } = require('celebrate');


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


module.exports = { brandsPost, brandsDelete };
