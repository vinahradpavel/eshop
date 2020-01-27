const express = require('express');
const { celebrate } = require('celebrate');
const roleAccess = require('../../middlewares/roleAccess');
const { ROLES } = require('../../constants/users');

const { ADMIN, SELLER, CUSTOMER } = ROLES;
const Orders = require('../../models/orders');
const { ordersPost, ordersGet } = require('../../validators/orders');

const router = express.Router();

router.get('/', roleAccess({ roles: [ADMIN, SELLER] }), celebrate(ordersGet), async (req, res, next) => {
  try {
    const {
      orderNumber,
      // minOrderDate,
      // maxOrderDate,
      // dateDelivery,
      status,
      name,
      surname,
      page,
      limit,
      offset,
    } = req.query;

    const orders = await Orders.find({
      orderNumber,
      'deliveryInformation.name': { $regex: name },
      'deliveryInformation.surname': { $regex: surname },
      status: { $regex: status },

    })
      .populate('products.idProduct customer seller')
      .lean()
      .skip(limit * (page - 1) + offset)
      .limit(limit);

    return res.status(200).json({
      orders,
    });
  } catch (error) {
    next(error);
  }
});

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


module.exports = router;
