const express = require('express');
const { celebrate } = require('celebrate');
const roleAccess = require('../../middlewares/roleAccess');
const { ROLES } = require('../../constants/users');

const { ADMIN, SELLER, CUSTOMER } = ROLES;
const Orders = require('../../models/orders');
const {
  ordersPost,
  // ordersGet,
  ordersDelete,
  ordersGetByStatus,
  ordersGetByNumber,
} = require('../../validators/orders');

const router = express.Router();

router.post('/', roleAccess({ roles: [CUSTOMER, ADMIN, SELLER] }), celebrate(ordersPost), async (req, res, next) => {
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

router.get('/', roleAccess({ roles: [ADMIN, SELLER] }), celebrate(ordersGetByStatus), async (req, res, next) => {
  try {
    const {
      status,
      page,
      limit,
      offset,
    } = req.query;

    const searchQuery = status ? { status } : {};
    const orders = await Orders.find(
      searchQuery,
    )
      .populate('products.idProduct customer seller')
      .skip(limit * (page - 1) + offset)
      .limit(limit)
      .lean();

    return res.status(200).json({
      orders,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:orderNumber', roleAccess({ roles: [ADMIN, SELLER] }), celebrate(ordersGetByNumber), async (req, res, next) => {
  try {
    const { orderNumber } = req.params;

    const orders = await Orders.find({
      orderNumber,
    })
      .populate('products.idProduct customer seller')
      .lean();

    return res.status(200).json({
      orders,
    });
  } catch (error) {
    next(error);
  }
});


router.delete('/:id', roleAccess({ roles: [ADMIN, SELLER] }), celebrate(ordersDelete), async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Orders.delete({ _id: id });

    return res.status(200).json({
      order,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
