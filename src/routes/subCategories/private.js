const express = require('express');
const { celebrate } = require('celebrate');
const SubCategories = require('../../models/subCategories');
const roleAccess = require('../../middlewares/roleAccess');

const { ROLES } = require('../../constants/users');

const { ADMIN } = ROLES;


const { subCategoriesPost, subCategoriesDelete } = require('../../validators/subCategories');

const router = express.Router();

router.post('/', roleAccess({ roles: [ADMIN] }), celebrate(subCategoriesPost), async (req, res, next) => {
  try {
    const subCategory = await SubCategories.create(
      req.body,
    );
    return res.status(200).json({
      subCategory,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/', roleAccess({ roles: [ADMIN] }), celebrate(subCategoriesDelete), async (req, res, next) => {
  try {
    const { name } = req.query;
    const subCategory = await SubCategories.deleteOne({ name });
    return res.status(200).json({
      subCategory,
    });
  } catch (error) {
    next(error);
  }
});


module.exports = router;