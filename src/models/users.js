const mongoose = require('mongoose');

const { Schema } = mongoose;

// установка схемы
const userScheme = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 25,
  },
  surname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 25,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Users = mongoose.model('User', userScheme);

module.exports = Users;
