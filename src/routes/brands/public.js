const express = require('express');
const Brands = require('../../models/brands');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const brands = await Brands.find().lean();
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
