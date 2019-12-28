const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { user } = req;
    res.status(200).json(
      {
        user,
      },
    );
  } catch (error) {
    next(error);
  }
});


module.exports = router;
