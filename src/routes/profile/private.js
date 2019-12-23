const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { user } = req;
    res.status(200).json(
      {
        user,
      },
    );
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;
