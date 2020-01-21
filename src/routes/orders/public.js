const express = require('express');
const { celebrate } = require('celebrate');

const Orders = require('../../models/orders');
const { ordersPost } = require('../../validators/orders');

const router = express.Router();

router.post('/public', celebrate(ordersPost), async (req, res, next) => {
  try {
    const order = await Orders.create(req.body);

    return res.status(200).json({
      order,
    });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
