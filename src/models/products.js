
const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const productsScheme = new Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: { index: true },
  },
  description: {
    type: String,
    minlength: 10,
    required: true,
  },
  price: {
    type: Number,
    min: 0.00,
    required: true,
  },
  category: {
    type: ObjectId,
    ref: 'Categories',
  },
  brand: {
    type: ObjectId,
    ref: 'Brands',
  },
  other: {
    type: String,
    minlength: 10,
  },
});

const Products = mongoose.model('Products', productsScheme);

module.exports = Products;
