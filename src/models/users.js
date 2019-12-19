const mongoose = require('mongoose');

const { Schema } = mongoose;

const usersScheme = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    required: true,
  },
  name: {
    type: String,
    minlength: 3,
    maxlength: 15,
  },
  surname: {
    type: String,
    minlength: 3,
    maxlength: 20,
  },
  role: {
    type: String,
    enum: ['admin', 'seller', 'customer'],
    default: 'customer',
  },
  isActiv: {
    type: Boolean,
    enum: [true, false],
    default: false,
  },

});

const Users = mongoose.model('Users', usersScheme);

module.exports = Users;
