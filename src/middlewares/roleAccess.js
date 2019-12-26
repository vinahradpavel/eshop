const roleAccess = ({ roles = [] }) => async (req, res, next) => {
  try {
    const { user } = req;
    const { role } = user;

    if (roles.includes(role)) {
      next();
    } else {
      return res.status(403).json({
        error: 'Access denied.',
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = roleAccess;
