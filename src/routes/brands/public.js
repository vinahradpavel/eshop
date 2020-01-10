const express = require('express');
const { celebrate } = require('celebrate');
const Brands = require('../../models/brands');
const { brandsGet } = require('../../validators/brands.js');

const router = express.Router();

router.get('/', celebrate(brandsGet), async (req, res, next) => {
  try {
    const {
      name,
      page,
      limit,
      offset,
    } = req.query;

    const brands = await Brands.find({ name: { $regex: name } })
      .lean()
      .skip(limit * (page - 1) + offset)
      .limit(limit);

    return res.status(200).json({
      brands,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await Brands.findById({ _id: id }).lean();

    return res.status(200).json({
      brand,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
