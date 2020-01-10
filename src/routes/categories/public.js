const express = require('express');
const { celebrate } = require('celebrate');

const Categories = require('../../models/categories');
const { categoriesGet } = require('../../validators/categories');

const router = express.Router();

router.get('/', celebrate(categoriesGet), async (req, res, next) => {
  try {
    const {
      name,
      description,
      page,
      limit,
      offset,
    } = req.query;

    const categories = await Categories.find({
      name: { $regex: name },
      description: { $regex: description },
    }).populate('subCategories')
      .lean()
      .skip(limit * (page - 1) + offset)
      .limit(limit);

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
