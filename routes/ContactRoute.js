const express = require('express');
const router = express.Router();
const Contact = require('../models/ContactModel');

//Contact description inserted
router.post('/contact/insert', function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  const data = new Contact({
    name: name,
    email: email,
    message: message,
  });

  data
    .save()
    .then(function (result) {
      // success
      res.status(200).json({ success: true, message: 'Thank you!! We will reach you soon' });
    })
    .catch(function (error) {
      res.status(500).json({ message: error });
    });
});
//end of contact description inserted

router.get('/contact/fetch', function (req, res) {
  Contact.find().then(function (contactData) {
    res
      .status(200)
      .json({ success: true, count: contactData.length, data: contactData });
  });
});

module.exports = router;
