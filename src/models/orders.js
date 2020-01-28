const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const { STATUS, PAYMENTMETHODS } = require('../constants/orders');

const { NEWORDER } = STATUS;

const ordersScheme = new Schema({

  orderNumber: {
    type: Number,
    default: 0,
  },

  customer: {
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

  orderDate: {
    type: Date,
    default: Date.now(),
  },

  status: {
    type: String,
    enum: Object.values(STATUS),
    default: NEWORDER,
  },

  orderInformation: {
    type: String,
    minlength: 10,
    maxlength: 250,
    default: '',
  },

  deliveryInformation: {
    name: {
      type: String,
      minlength: 2,
      maxlength: 50,
      required: true,
    },
    surname: {
      type: String,
      minlength: 2,
      maxlength: 50,
      required: true,
    },
    country: {
      type: String,
      minlength: 2,
      maxlength: 50,
      required: true,
    },
    city: {
      type: String,
      minlength: 2,
      maxlength: 50,
      required: true,
    },
    address: {
      type: String,
      minlength: 2,
      maxlength: 100,
      required: true,
    },
    dateDelivery: {
      type: Date,
    },
  },

  seller: {
    type: ObjectId,
    ref: 'Users',
  },

  paymentMethod: {
    type: String,
    enum: Object.values(PAYMENTMETHODS),
    required: true,

  },

  totalPrice: {
    type: Number,
  },
});


ordersScheme.pre('save', async function save(next) {
  try {
    // this.orderNumber = await this.constructor.count() + 1;
    // this.orderNumber = await mongoose.models.Orders.countDocuments() + 1;

    const count = this.products.map((it) => ({ _id: it.idProduct, count: it.count }));
    const products = this.products.map((it) => mongoose.Types.ObjectId(it.idProduct));

    const [maxOrderNumber] = await mongoose.models.Orders.aggregate([{
      $group: { _id: null, lastOrderNumber: { $max: '$orderNumber' } },
    }]);

    this.orderNumber = maxOrderNumber.lastOrderNumber + 1;

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

const Orders = mongoose.model('Orders', ordersScheme);

module.exports = Orders;
