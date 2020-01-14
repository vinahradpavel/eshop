const express = require('express');
const Orders = require('../../models/orders');
// const { ordersPost } = require('../../validators/orders');

const router = express.Router();

// router.get('/', async (req, res, next) => {
//   try {
//     const { user } = req;
//     const { _id } = user;

//     const orders = await Orders.find({ customer: _id }).lean();

//     res.status(200).json(
//       {
//         orders,
//       },
//     );
//   } catch (error) {
//     next(error);
//   }
// });


module.exports = router;
