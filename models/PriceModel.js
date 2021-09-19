const mongoose = require('mongoose');

const Ticket = mongoose.model('Ticket', {
  platinum_ticket: {
    type: String,
    require: true,
  },
  gold_ticket: {
    type: String,
    require: true,
  },
  silver_ticket: {
    type: String,
    require: true,
  },
  dis_platinum_ticket: {
    type: String,
    require: true,
  },
  dis_gold_ticket: {
    type: String,
    require: true,
  },
  dis_silver_ticket: {
    type: String,
    require: true,
  }
});

module.exports = Ticket