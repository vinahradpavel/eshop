const express = require('express');
const roleAccess = require('../../middlewares/roleAccess');
const { ROLES } = require('../../constants/users');

const { CUSTOMER, SELLER, ADMIN } = ROLES;

const SubCategories = require('../../models/subCategories');

const router = express.Router();

router.get('/', roleAccess({ roles: [CUSTOMER, SELLER, ADMIN] }), async (req, res, next) => {
  try {
    const subCategories = await SubCategories.find().lean();
    // const categoryData = await Categories.find({}).populate('subCategories').lean();
    return res.status(200).json({
      brands: subCategories,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
