const validateUsers = ({ body = [] }) => (req, res, next) => {
  const existedProps = body.filter((it) => !Object.keys(req.body).includes(it));

  if (existedProps.length === 0) {
    next();
  } else {
    return res.status(400).json({
      errors: existedProps.map((it) => (`${it} field is required`)),
    });
  }
};

module.exports = validateUsers;

