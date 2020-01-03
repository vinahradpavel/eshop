const express = require('express');
const { celebrate } = require('celebrate');
const Categories = require('../../models/categories');
const roleAccess = require('../../middlewares/roleAccess');

const { ROLES } = require('../../constants/users');

const { ADMIN } = ROLES;

const { categoriesPost } = require('../../validators/categories');

const router = express.Router();

router.post('/', roleAccess({ roles: [ADMIN] }), celebrate(categoriesPost), async (req, res, next) => {
  try {
    const category = await Categories.create(
      req.body,
    );
    // const categoryData = await Categories.find({}).populate('subCategories').lean();
    return res.status(200).json({
      category,
    });
  } catch (error) {
    next(error);
  }
});

// router.delete('/', roleAccess({ roles: [ADMIN] }), celebrate(), async (req, res, next) => {
//   try {
//     const { name } = req.query;
//     const category = await Categories.deleteOne({ name });
//     return res.status(200).json({
//       category,
//     });
//   } catch (error) {
//     next(error);
//   }
// });


module.exports = router;
