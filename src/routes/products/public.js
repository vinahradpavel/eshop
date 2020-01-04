const express = require('express');
const Products = require('../../models/products');
const roleAccess = require('../../middlewares/roleAccess');

const { ROLES } = require('../../constants/users');

const { CUSTOMER, SELLER, ADMIN } = ROLES;

const router = express.Router();

router.get('/', roleAccess({ roles: [CUSTOMER, ADMIN, SELLER] }), async (req, res, next) => {
  try {
    const products = await Products.find().lean();
    return res.status(200).json({
      products,
    });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
