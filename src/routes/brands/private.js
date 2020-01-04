const express = require('express');
const { celebrate } = require('celebrate');

const roleAccess = require('../../middlewares/roleAccess');
const { ROLES } = require('../../constants/users');

const { ADMIN } = ROLES;

const Brands = require('../../models/brands');
const { brandsPost, brandsDelete } = require('../../validators/brands');

const router = express.Router();

router.post('/', roleAccess({ roles: [ADMIN] }), celebrate(brandsPost), async (req, res, next) => {
  try {
    const brand = await Brands.create(
      req.body,
    );
    // const categoryData = await Categories.find({}).populate('subCategories').lean();
    return res.status(200).json({
      brand,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/', roleAccess({ roles: [ADMIN] }), celebrate(brandsDelete), async (req, res, next) => {
  try {
    const { name } = req.query;
    const brand = await Brands.deleteOne({ name });
    return res.status(200).json({
      brand,
    });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
