const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const { Schema } = mongoose;

const brandsScheme = new Schema({

  name: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true,
    unique: { index: true },
  },

});

brandsScheme.plugin(mongooseDelete, { overrideMethods: 'all' });

const Brands = mongoose.model('Brands', brandsScheme);

module.exports = Brands;
