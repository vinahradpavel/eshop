const express = require('express');
const { celebrate } = require('celebrate');

const roleAccess = require('../../middlewares/roleAccess');
const { ROLES } = require('../../constants/users');

const { ADMIN } = ROLES;

const Brands = require('../../models/brands');
const { brandsPost, brandsDelete, brandsUpdate } = require('../../validators/brands');

const router = express.Router();

router.post('/', roleAccess({ roles: [ADMIN] }), celebrate(brandsPost), async (req, res, next) => {
  try {
    const brand = await Brands.create(
      req.body,
    );

    return res.status(200).json({
      brand,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', roleAccess({ roles: [ADMIN] }), celebrate(brandsDelete), async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await Brands.delete({ _id: id });

    return res.status(200).json({
      brand,
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', roleAccess({ roles: [ADMIN] }), celebrate(brandsUpdate), async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await Brands.update({ _id: id }, req.body);

    return res.status(200).json({
      brand,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
