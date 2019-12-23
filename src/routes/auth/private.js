const express = require('express');
const jwt = require('jsonwebtoken');
const Users = require('../../models/users');
const { ROLES } = require('../../constants/users');

const { ADMIN } = ROLES;


const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { user } = req;
    res.send(
      {
        user,
      },
    );
  } catch (error) {
    console.log(error);
  }
});

router.get('/users', async (req, res) => {
  try {
    const { user } = req;
    const { role } = user;

    if (role === ADMIN) {
      const users = await Users.find().lean();
      return res.json({
        users,
      });
    }
    return res.json({
      error: 'Message error. Access for admin',
    });
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;
