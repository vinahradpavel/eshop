const express = require('express');
const Categories = require('../../models/categories');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const categories = await Categories.find().lean();
    return res.status(200).json({
      categories,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
