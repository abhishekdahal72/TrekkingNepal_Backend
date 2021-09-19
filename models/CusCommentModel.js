const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const UserComment = mongoose.model('UserComment', {
  customerid: {
    type: ObjectId,
    ref: 'Customer',
    require: true,
  },
  mid: {
    type: ObjectId,
    ref: 'Movie',
  },

  comment: {
    type: String,
    require: true,
  },
});

module.exports = UserComment;
