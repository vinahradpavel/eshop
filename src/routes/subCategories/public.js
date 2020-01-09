const express = require('express');
const { celebrate } = require('celebrate');
const SubCategories = require('../../models/subCategories');
const { subCategoriesGet } = require('../../validators/subCategories');

const router = express.Router();

router.get('/', celebrate(subCategoriesGet), async (req, res, next) => {
  try {
    const { name } = req.query;

    const subCategories = await SubCategories.find({ name: { $regex: name } }).lean();

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
