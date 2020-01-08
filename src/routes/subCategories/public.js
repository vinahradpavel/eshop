const express = require('express');
const SubCategories = require('../../models/subCategories');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const subCategories = await SubCategories.find().lean();
    return res.status(200).json({
      subCategories,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
