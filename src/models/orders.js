const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const { STATUS } = require('../constants/orders');

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
      require: true,
      default: 1,
    },
  }],

  orderDate: {
    type: Date,
    default: Date.now(),
  },

  status: {
    type: String,
    enum: STATUS,
    default: NEWORDER,
  },

  orderInforamtion: {
    type: String,
    minlength: 10,
  },

  deliveryInformation: {
    country: {
      type: String,
      minlength: 2,
      required: true,
    },
    city: {
      type: String,
      minlength: 2,
      required: true,
    },
    address: {
      type: String,
      minlength: 2,
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
    cash: {
      type: Boolean,
      default: true,
    },
    cashless: {
      type: Boolean,
      default: false,
    },
    combined: {
      type: Boolean,
      default: false,
    },
  },

  totalPrice: {
    type: Number,
  },
});

const Orders = mongoose.model('Orders', ordersScheme);

module.exports = Orders;
