const express = require('express');
const { celebrate } = require('celebrate');
const roleAccess = require('../../middlewares/roleAccess');
const { ROLES } = require('../../constants/users');

const { ADMIN, SELLER, CUSTOMER } = ROLES;
const Orders = require('../../models/orders');
const { ordersPost } = require('../../validators/orders');

const router = express.Router();

router.get('/', roleAccess({ roles: [ADMIN, SELLER] })/* celebrate(ordersPost) */, async (req, res, next) => {
  try {
    const orders = await Orders.find()
      .populate('products.idProduct customer seller')
      .lean();

    return res.status(200).json({
      orders,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', roleAccess({ roles: [CUSTOMER] }), celebrate(ordersPost), async (req, res, next) => {
  try {
    const { user } = req;
    const { _id } = user;
    const customerOrder = { customer: _id, ...req.body };
    const order = await Orders.create(customerOrder);

    return res.status(200).json({
      order,
    });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
