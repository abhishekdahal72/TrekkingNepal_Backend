const express = require('express');
const router = express.Router();
const TicketBook = require('../models/BookTicketModel');
const customerAuth = require('../middleware/UserAuth');

router.post('/ticketbook', function (req, res) {
  const title = req.body.title;
  const mid = req.body.mid;
  const date = req.body.date;
  const time = req.body.time;
  const username = req.body.username;
  const uid = req.body.uid;
  console.log(req.body);
  const data = new TicketBook({
    title: title,
    mid: mid,
    date: date,
    time: time,
    username: username,
    uid: uid,
  });
  data
    .save()
    .then(function (result) {
      console.log(result);
      res.status(200).json({ success: true, message: 'Booking Completed' });
    })
    .catch(function (error) {
      res.status(500).json({ message: error });
    });
});

router.get('/ticketbook/fetch', function (req, res) {
  TicketBook.find().then(function (ticketData) {
    res
      .status(200)
      .json({ success: true, count: ticketData.length, data: ticketData });
  });
});

//BookTicket deleted
router.delete('/ticketbook/delete/:id', function (req, res) {
  const uid = req.params.id;
  TicketBook.deleteOne({ _id: uid })
    .then(function (result) {
      res
        .status(200)
        .json({ success: true, message: 'Ticket Booked Cancelled !!' });
    })
    .catch(function (err) {
      res.status(500).json({ success: false, message: err });
    });
});
module.exports = router;
