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

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const subCategory = await SubCategories.findById({ _id: id }).lean();
    return res.status(200).json({
      subCategory,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
