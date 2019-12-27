function logErrors(err, req, res, next) {
  const { errmsg, message } = err;

  if (errmsg) {
    res.status(400).send({
      status: 400,
      type: 'MongoError',
      error: errmsg,
    });
  }

  if (message) {
    res.status(400).send({
      status: 400,
      type: 'JoiError',
      error: message,
    });
  }

  next(err);
}

module.exports = logErrors;
