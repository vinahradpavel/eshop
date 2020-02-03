const express = require('express');
const { celebrate } = require('celebrate');

const Users = require('../../models/users');
const Orders = require('../../models/orders');

const roleAccess = require('../../middlewares/roleAccess');
const { ordersGetById } = require('../../validators/orders');
const { customersGet, customersGetById } = require('../../validators/customers');
const { ROLES } = require('../../constants/users');

const { ADMIN, SELLER, CUSTOMER } = ROLES;


const router = express.Router();

router.get('/', roleAccess({ roles: [ADMIN, SELLER] }), celebrate(customersGet), async (req, res, next) => {
  try {
    const {
      page,
      limit,
      offset,
    } = req.query;

    const users = await Users.find({ role: CUSTOMER })
      .skip(limit * (page - 1) + offset)
      .limit(limit)
      .lean();

    return res.status(200).json({
      users,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', roleAccess({ roles: [ADMIN, SELLER] }), celebrate(customersGetById), async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      page,
      limit,
      offset,
    } = req.query;

    const users = await Users.find({ role: CUSTOMER, _id: id })
      .skip(limit * (page - 1) + offset)
      .limit(limit)
      .lean();

    return res.status(200).json({
      users,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/orders:id', roleAccess({ roles: [ADMIN, SELLER] }), celebrate(ordersGetById), async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      page,
      limit,
      offset,
    } = req.query;

    const orders = await Orders.find({ customer: id })
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


module.exports = router;
