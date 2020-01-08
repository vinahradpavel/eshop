const express = require('express');
const { celebrate } = require('celebrate');

const roleAccess = require('../../middlewares/roleAccess');
const { ROLES } = require('../../constants/users');

const { ADMIN } = ROLES;

const Categories = require('../../models/categories');
const { categoriesPost, categoriesDelete } = require('../../validators/categories');

const router = express.Router();

router.post('/', roleAccess({ roles: [ADMIN] }), celebrate(categoriesPost), async (req, res, next) => {
  try {
    const category = await Categories.create(
      req.body,
    );

    return res.status(200).json({
      category,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', roleAccess({ roles: [ADMIN] }), celebrate(categoriesDelete), async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Categories.delete({ _id: id });
    return res.status(200).json({
      category,
    });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
