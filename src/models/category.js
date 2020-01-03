
const mongoose = require('mongoose');


const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const categoryScheme = new Schema({

  name: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true,
  },
  description: {

  },
  subCategories: { type: ObjectId, ref: 'SubCategories' },


});

const Categories = mongoose.model('Categories', categoryScheme);

module.exports = Categories;