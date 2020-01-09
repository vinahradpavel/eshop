const express = require('express');
const { celebrate } = require('celebrate');

const roleAccess = require('../../middlewares/roleAccess');
const { ROLES } = require('../../constants/users');

const { ADMIN } = ROLES;

const Products = require('../../models/products');
const { productsPost, productsDelete, productsUpdate } = require('../../validators/products');

const router = express.Router();

router.post('/', roleAccess({ roles: [ADMIN] }), celebrate(productsPost), async (req, res, next) => {
  try {
    const product = await Products.create(
      req.body,
    );

    return res.status(200).json({
      product,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', roleAccess({ roles: [ADMIN] }), celebrate(productsDelete), async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Products.findByIdAndDelete({ _id: id });

    return res.status(200).json({
      product,
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', roleAccess({ roles: [ADMIN] }), celebrate(productsUpdate), async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Products.update({ _id: id }, req.body);

    return res.status(200).json({
      product,
    });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
