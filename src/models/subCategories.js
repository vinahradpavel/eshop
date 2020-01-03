
const mongoose = require('mongoose');

const { Schema } = mongoose;

const subCategoryScheme = new Schema({

  name: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true,
    unique: { index: true },
  },

});

const SubCategories = mongoose.model('SubCategories', subCategoryScheme);

module.exports = SubCategories;
