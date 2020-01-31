
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const categoryScheme = new Schema({

  name: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true,
    unique: { index: true },
  },
  description: {
    type: String,
    minlength: 10,
  },
  subCategories: [{
    required: true,
    type: ObjectId,
    ref: 'SubCategories',
  }],

});

categoryScheme.plugin(mongooseDelete, { overrideMethods: 'all' });

const Categories = mongoose.model('Categories', categoryScheme);

module.exports = Categories;
