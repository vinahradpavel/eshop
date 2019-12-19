const mongoose = require('mongoose');
const { ROLES } = require('../constants/usersConstants');

const { CUSTOMER } = ROLES;
const { Schema } = mongoose;

const usersScheme = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
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
    enum: Object.values(ROLES),
    default: CUSTOMER,
  },
  isActive: {
    type: Boolean,
    default: false,
  },

});

usersScheme.pre('save', async () => {

});

const Users = mongoose.model('Users', usersScheme);

module.exports = Users;
