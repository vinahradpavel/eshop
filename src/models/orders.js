const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const { STATUS, PAYMENTMETHODS } = require('../constants/orders');

const { NEWORDER } = STATUS;

const ordersScheme = new Schema({

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

  orderInforamtion: {
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

  paymentMetod: {
    type: String,
    enum: Object.values(PAYMENTMETHODS),
    required: true,

  },

  totalPrice: {
    type: Number,
  },
});

const Orders = mongoose.model('Orders', ordersScheme);

module.exports = Orders;
