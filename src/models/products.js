const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

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
  subCategory: {
    type: ObjectId,
    ref: 'SubCategories',
    required: true,
  },
  brand: {
    type: ObjectId,
    ref: 'Brands',
    required: true,
  },
  other: {
    type: String,
    minlength: 10,
  },
});

productsScheme.plugin(mongooseDelete, { overrideMethods: 'all' });

const Products = mongoose.model('Products', productsScheme);

module.exports = Products;
