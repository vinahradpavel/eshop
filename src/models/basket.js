const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const basketScheme = new Schema({

  userKey: {
    type: String,
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

});

const Basket = mongoose.model('Basket', basketScheme);

module.exports = Basket;
