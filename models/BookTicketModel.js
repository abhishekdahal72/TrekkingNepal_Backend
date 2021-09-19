const mongoose = require('mongoose');

const BookTicket = mongoose.model('BookTicket', {
  title: {
    type: String,
    require: true,
  },
  mid: {
    type: String,
    require: true,
  },
  uid: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  time: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
});

module.exports = BookTicket;
