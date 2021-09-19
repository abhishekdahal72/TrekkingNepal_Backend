const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', {
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  phone: {
    type: Number,
  },
  email: {
    type: String,
    require: true,
  },
  dob: {
    type: String,
  },
  imagepp: {
    type: String,
    default:"jhjjh"
  },
  userType: {
    type: String,
    enum: ['user', 'admin'],
    default:'user'
  },
});

module.exports = Customer;
