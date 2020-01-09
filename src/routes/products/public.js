const express = require('express');
const Products = require('../../models/products');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const products = await Products.find().populate('subCategory brand').lean();
    return res.status(200).json({
      products,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Products.findById({ _id: id }).populate('subCategory brand').lean();
    return res.status(200).json({
      product,
    });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
