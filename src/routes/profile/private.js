const express = require('express');
const { celebrate } = require('celebrate');

const router = express.Router();

const Orders = require('../../models/orders');
const { ordersGetByStatus } = require('../../validators/orders');

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

router.get('/orders', celebrate(ordersGetByStatus), async (req, res, next) => {
  try {
    const { user } = req;
    const { _id } = user;
    const {
      status,
      page,
      limit,
      offset,
    } = req.query;

    const searchQuery = status ? {
      customer: _id,
      status,
    } : {
      customer: _id,
    };

    const orders = await Orders.find(searchQuery)
      .populate('products.idProduct customer seller')
      .skip(limit * (page - 1) + offset)
      .limit(limit)
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
