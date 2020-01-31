const express = require('express');
const { celebrate } = require('celebrate');
const Basket = require('../../models/basket');
const { basketPost } = require('../../validators/basket');
const { ROLES } = require('../../constants/users');

const { CUSTOMER } = ROLES;
const roleAccess = require('../../middlewares/roleAccess');

const router = express.Router();

router.post('/', celebrate(basketPost), async (req, res, next) => {
  try {
    const sessionId = req.session.id;
    const { _id } = req.user;

    const createQuery = _id ? {
      userId: _id,
      sessionId,
      ...req.body,
    } : {
      sessionId,
      ...req.body,
    };

    const basket = await Basket.create(createQuery);

    return res.status(200).json({
      basket,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/', roleAccess({ roles: [CUSTOMER] }), async (req, res, next) => {
  try {
    const sessionId = req.session.id;
    const { _id } = req.user;
    const {
      page,
      limit,
      offset,
    } = req.query;

    const searchQuery = _id ? { userId: _id } : { sessionId };

    const basket = await Basket.find(searchQuery)
      .populate('products.idProduct')
      .skip(limit * (page - 1) + offset)
      .limit(limit)
      .lean();

    return res.status(200).json({
      basket,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
