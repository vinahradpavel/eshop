const express = require('express');
const { celebrate } = require('celebrate');

const Products = require('../../models/products');
const { productsGet } = require('../../validators/products');

const router = express.Router();

router.get('/', celebrate(productsGet), async (req, res, next) => {
  try {
    const {
      name, description, minPrice, maxPrice, other, ...rest
    } = req.query;

    const products = await Products.find({
      name: { $regex: name },
      description: { $regex: description },
      price: { $gt: minPrice, $lt: maxPrice },
      ...rest,
    }).populate('subCategory brand').lean();

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
