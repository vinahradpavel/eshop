const express = require('express');
const jwt = require('jsonwebtoken');
const Users = require('../../models/users');

const { jwtsecret } = require('../../constants/usersConstants');

const router = express.Router();

router.post('/registration', async (req, res) => {
  try {
    const user = await Users.create(
      req.body,
    );
    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/authorization', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({
        error: 'Login or password incorrect.',
      });
    }
    const isValidate = await user.validatePassword(password);

    if (isValidate) {
      const payload = {
        login: user.login,
        password: user.password,
      };

      const token = jwt.sign({
        data: payload,
      }, jwtsecret, {
        expiresIn: '1h',
      }, {
        algorithm: 'RS256',
      });

      return res.json({
        user,
        token,
      });
    }

    return res.status(404).json({
      error: 'Login or password incorrect.',
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
