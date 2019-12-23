const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const [, token] = req.headers.authorization.split(' ');
    const { user } = jwt.verify(token, process.env.JWTSECRET);

    if (!user) {
      return res.status(401).json({
        error: 'Invalid token.',
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Invalid token.',
    });
  }
};
