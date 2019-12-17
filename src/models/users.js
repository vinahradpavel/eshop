const mongoose = require('mongoose');

const { Schema } = mongoose;

// установка схемы
const userScheme = new Schema({
  name: String,
  surname: String,
  age: Number,
});

const Users = mongoose.model('User', userScheme);

module.exports = Users;
