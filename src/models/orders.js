
const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const ordersScheme = new Schema({
  customer: {
    type: ObjectId,
    ref: 'Users',
    required: true,
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

  dateOrder: {
    type: Date,
    default: Date.now(),
  },
  //   dateDelivery: {
  //     type: Date,
  //   },
  totalPrice: {
    type: Number,
  },

//   description: {
//     type: String,
//     minlength: 10,
//   },
});

const Orders = mongoose.model('Orders', ordersScheme);

module.exports = Orders;
