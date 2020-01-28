const express = require('express');
const { celebrate } = require('celebrate');

const Products = require('../../models/products');
const { productsGet } = require('../../validators/products');

const router = express.Router();


router.get('/', celebrate(productsGet), async (req, res, next) => {
  try {
    const {
      name,
      minPrice,
      maxPrice,
      page,
      limit,
      offset,
      ...rest
    } = req.query;

    const products = await Products.find({
      name: { $regex: name },
      price: { $gt: minPrice, $lt: maxPrice },
      ...rest,
    }).populate('subCategory brand')
      .skip(limit * (page - 1) + offset)
      .limit(limit)
      .lean();


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
