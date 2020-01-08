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

module.exports = router;
