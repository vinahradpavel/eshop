/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { ROLES } = require('../constants/users');

const { CUSTOMER } = ROLES;
const { Schema } = mongoose;

const usersScheme = new Schema({
  email: {
    type: String,
    required: true,
    unique: { index: true },
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
    enum: Object.values(ROLES).filter((it) => it !== ROLES.ADMIN),
    default: CUSTOMER,
  },
  isActive: {
    type: Boolean,
    default: false,
  },

});

usersScheme.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});
usersScheme.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});
usersScheme.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};
const Users = mongoose.model('Users', usersScheme);

module.exports = Users;
