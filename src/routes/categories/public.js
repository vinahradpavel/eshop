const express = require('express');
const Categories = require('../../models/categories');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const categories = await Categories.find().populate('subCategories').lean();
    return res.status(200).json({
      categories,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Categories.findById({ _id: id }).populate('subCategories').lean();
    return res.status(200).json({
      category,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
