const express = require('express');
const Users = require('../../models/users');

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
    // return res.json(error);
    console.log(error);
  }
});

router.post('/authorization', async (req, res) => {
  try {
    console.log(req.headers);
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).json({
        error: 'ili parol ili ligin neverni',
      });
    }
    const isValidate = await user.validatePassword(password);
    console.log(isValidate);

    if (isValidate) {
      return res.json({
        user,
      });
    }
    return res.status(404).json({
      error: 'ili parol ili ligin neverni',
    });
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;
