const validateUsers = ({ body = [], params = [] }) => (req, res, next) => {
  const errors = [];

  const bodyInvalid = body
    .filter((it) => !Object.keys(req.body).includes(it))
    .map((it) => `${it} is required`);

  errors.push(...bodyInvalid);

  const paramsValid = params
    .map((it) => ({ par: it, value: req.params[it] }))
    .filter((it) => !it.value.match(/^.{4,30}$/g))
    .map((it) => `${it.value} invalid value for paramentr ${it.par}`);

  errors.push(...paramsValid);

  if (errors.length === 0) {
    next();
  } else {
    return res.status(400).json({
      errors,
    });
  }
};

module.exports = validateUsers;
