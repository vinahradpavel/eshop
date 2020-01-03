
const mongoose = require('mongoose');

const { Schema } = mongoose;

const productsScheme = new Schema({
  name: {
    type: String,
    required: true,
    unique: { index: true },
  },
  description: {
    type: String,
    minlength: 5,
    required: true,
  },
  price: {
    type: Number,
    minlength: 3,
    maxlength: 15,
  },
  brand: {
    type: String,
    minlength: 3,
    maxlength: 20,
  },
  category: {
    type: String,
    enum: Object.values(ROLES).filter((it) => it !== ROLES.ADMIN),
    default: CUSTOMER,
  },
  subcategory: {
    type: Boolean,
    default: false,
  },

});

const Products = mongoose.model('Products', productsScheme);

module.exports = Products;
