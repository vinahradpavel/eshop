const express = require('express');

const router = express.Router();

const Orders = require('../../models/orders');

router.get('/', async (req, res, next) => {
  try {
    const { user } = req;
    res.status(200).json(
      {
        user,
      },
    );
  } catch (error) {
    next(error);
  }
});

router.get('/orders', async (req, res, next) => {
  try {
    const { user } = req;
    const { _id } = user;

    const orders = await Orders.find({ customer: _id })
      .populate('products.idProduct customer seller')
      .lean();

    res.status(200).json(
      {
        orders,
      },
    );
  } catch (error) {
    next(error);
  }
});

module.exports = router;
