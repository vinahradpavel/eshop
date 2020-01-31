const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const basketScheme = new Schema({

  sessionId: {
    type: String,
  },

  userId: {
    type: ObjectId,
    ref: 'Users',
  },

  products: [{
    idProduct: {
      type: ObjectId,
      ref: 'Products',
      required: true,
    },
    count: {
      type: Number,
      default: 1,
      require: true,
    },
  }],

  totalPrice: {
    type: Number,
  },

});

basketScheme.pre('save', async function save(next) {
  try {
    const count = this.products.map((it) => ({ _id: it.idProduct, count: it.count }));
    const products = this.products.map((it) => mongoose.Types.ObjectId(it.idProduct));


    const [price] = await mongoose.models.Products.aggregate([
      {
        $match: {
          _id: { $in: products },
        },
      },
      {
        $project: {
          price: 1,
          items: {
            $filter: {
              input: count,
              as: 'num',
              cond: { $eq: ['$_id', '$$num._id'] },
            },
          },
        },
      },
      { $unwind: '$items' },
      { $group: { _id: null, totalPrice: { $sum: { $multiply: ['$price', '$items.count'] } } } },
    ]);

    this.totalPrice = price.totalPrice;

    return next();
  } catch (err) {
    return next(err);
  }
});

const Basket = mongoose.model('Basket', basketScheme);

module.exports = Basket;
