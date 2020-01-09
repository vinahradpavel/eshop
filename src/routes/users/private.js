const express = require('express');
const { celebrate } = require('celebrate');
const roleAccess = require('../../middlewares/roleAccess');
const Users = require('../../models/users');
const { ROLES } = require('../../constants/users');

const { usersGet } = require('../../validators/users');

const { ADMIN } = ROLES;


const router = express.Router();


router.get('/', celebrate(usersGet), roleAccess({ roles: [ADMIN] }), async (req, res, next) => {
  try {
    const {
      name, surname, role, isActive, email,
    } = req.query;

    const users = await Users.find({
      name: { $regex: name },
      surname: { $regex: surname },
      email: { $regex: email },
      isActive,
      role,
    }).lean();
    // const users = await Users.find().lean();
    return res.status(200).json({
      users,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
