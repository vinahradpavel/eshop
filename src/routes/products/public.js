const express = require('express');
const Products = require('../../models/products');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const products = await Products.find().lean();
    return res.status(200).json({
      products,
    });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
