const express = require('express');
const router = express.Router();
const Ticket = require('../models/TicketModel');
const customerAuth = require('../middleware/UserAuth');

//Ticket Price description inserted
router.post(
  '/ticket/insert',
  customerAuth.verifyUser,
  customerAuth.verifyAdmin,
  function (req, res) {
    const platinum_ticket = req.body.platinum_ticket;
    const gold_ticket = req.body.gold_ticket;
    const silver_ticket = req.body.silver_ticket;
    const dis_platinum_ticket = req.body.dis_platinum_ticket;
    const dis_gold_ticket = req.body.dis_gold_ticket;
    const dis_silver_ticket = req.body.dis_silver_ticket;

    const data = new Ticket({
      platinum_ticket: platinum_ticket,
      gold_ticket: gold_ticket,
      silver_ticket: silver_ticket,
      dis_platinum_ticket: dis_platinum_ticket,
      dis_gold_ticket: dis_gold_ticket,
      dis_silver_ticket: dis_silver_ticket,
    });

    data
      .save()
      .then(function (result) {
        console.log(result);
        res.status(200).json({ message: 'Ticket price inserted successfully' });
      })
      .catch(function (error) {
        console.log(error);
        res.status(500).json({ message: error });
      });
  }
);
//end of ticket description inserted

router.get('/ticket/fetch', function (req, res) {
  Ticket.findOne().then(function (ticketData) {
    res
      .status(200)
      .json({ success: true, count: ticketData.length, data: ticketData });
    console.log(ticketData);
  });
});

router.get('/ticket/webfetch', function (req, res) {
  Ticket.find().then(function (ticketData) {
    res
      .status(200)
      .json({ success: true, count: ticketData.length, data: ticketData });
    console.log(ticketData);
  });
});

// Ticket price update

router.put(
  '/ticket/update',
  customerAuth.verifyUser,
  customerAuth.verifyAdmin,
  function (req, res) {
    const platinum_ticket = req.body.platinum_ticket;
    const gold_ticket = req.body.gold_ticket;
    const silver_ticket = req.body.silver_ticket;
    const dis_platinum_ticket = req.body.dis_platinum_ticket;
    const dis_gold_ticket = req.body.dis_gold_ticket;
    const dis_silver_ticket = req.body.dis_silver_ticket;
    const tid = req.body.id;
    Ticket.updateOne(
      { _id: tid },
      {
        platinum_ticket: platinum_ticket,
        gold_ticket: gold_ticket,
        silver_ticket: silver_ticket,
        dis_platinum_ticket: dis_platinum_ticket,
        dis_gold_ticket: dis_gold_ticket,
        dis_silver_ticket: dis_silver_ticket,
      }
    )
      .then(function (result) {
        console.log(result);
        res.status(200).json({ message: 'Ticket Updated Successfully!!' });
      })
      .catch(function (e) {
        console.log(e);
        res.status(500).json({ message: e });
      });
  }
);

//end of ticket update

// router.get('/ticket/single/:id', function (req, res) {
//   const id = req.params.id;
//   Ticket.findOne({ _id: id })
//     .then(function (data) {
//       console.log(data);
//       res.status(200).json(data);
//     })
//     .catch(function (e) {
//       res.status(500).json({ error: e });
//     });
// });

module.exports = router;
