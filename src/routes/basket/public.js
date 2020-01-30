const express = require('express');
const { celebrate } = require('celebrate');
const Basket = require('../../models/basket');
const { basketPost } = require('../../validators/basket');

const router = express.Router();


// router.get('/', async (req, res, next) => {
//   try {
//     const basket = await Basket.find().populate('products.idProduct');

//     return res.status(200).json({
//       basket,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// router.post('/', celebrate(basketPost), async (req, res, next) => {
//   try {
//     const brand = await Basket.create(
//       req.body,
//     );

//     return res.status(200).json({
//       brand,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

router.get('/', (req, res, next) => {
  try {
    return res.status(200).json({
      session: req.session.hueta,
    });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
