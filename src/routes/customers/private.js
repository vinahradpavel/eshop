const express = require('express');
const roleAccess = require('../../middlewares/roleAccess');
const Users = require('../../models/users');
const { ROLES } = require('../../constants/users');

const { ADMIN, SELLER, CUSTOMER } = ROLES;


const router = express.Router();

router.get('/', roleAccess({ roles: [ADMIN, SELLER] }), async (req, res, next) => {
  try {
    const users = await Users.find({ role: CUSTOMER }).lean();

    return res.status(200).json({
      users,
    });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
