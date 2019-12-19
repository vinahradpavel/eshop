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
    return res.json(error);
  }
});


module.exports = router;
