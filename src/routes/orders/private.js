const express = require('express');
const { celebrate } = require('celebrate');
const roleAccess = require('../../middlewares/roleAccess');
const { ROLES } = require('../../constants/users');

const { ADMIN, SELLER } = ROLES;
const Orders = require('../../models/orders');


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


module.exports = router;
