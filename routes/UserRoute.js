const express = require('express');
const router = express.Router();
const Customer = require('../models/UserModel');
const customerAuth = require('../middleware/UserAuth');
const upload = require('../middleware/m_image');
const { check, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs'); //for password encryption
const jwt = require('jsonwebtoken');

//Customer register
router.post(
  '/customer/register',
  [
    check('fname', 'First Name is required!').not().isEmpty(),
    check('username', 'Username is required!').not().isEmpty(),
    check('password', 'Password is required!').not().isEmpty(),
  ],
  function (req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const fname = req.body.fname;
      const lname = req.body.lname;
      const username = req.body.username;
      const password = req.body.password;
      const address = req.body.address;
      const phone = req.body.phone;
      const email = req.body.email;
      const dob = req.body.dob;
      const imagepp = req.body.imagepp;
      const userType = req.body.userType;
      bcryptjs.hash(password, 10, function (err, hash) {
        const data = new Customer({
          fname: fname,
          lname: lname,
          username: username,
          password: hash,
          address: address,
          phone: phone,
          email: email,
          dob: dob,
          imagepp: imagepp,
          userType: userType,
        });
        data
          .save()
          .then(function (result) {
            //success
            res.status(201).json({
              success: true,
              message: 'Customer Registered Successfully',
            });
          })
          .catch(function (e) {
            res.status(500).json({ success: false, message: e });
          });
      });
    } else {
      res.status(400).json(errors.array());
    }
  }
);
//end of register

//Customer login
router.post('/customer/login', function (req, res) {
  Customer.findOne({ username: req.body.username })
    .then(function (customerData) {
      if (customerData === null) {
        return res
          .status(401)
          .json({ success: false, message: 'Authentication Failure!' });
      }
      bcryptjs.compare(
        req.body.password,
        customerData.password,
        function (err, presult) {
          console.log(presult);
          if (presult === false) {
            return res
              .status(401)
              .json({ success: false, message: 'Password Incorrect' });
          }
          //Token
          const token = jwt.sign({ uid: customerData._id }, 'secretkey');

          res.status(200).json({
            success: true,
            message: 'Customer Login successfull',
            token: token,
            userType: customerData.userType,
            customerid: customerData._id,
          });
        }
      );
    })
    .catch();
});

router.get('/profile', customerAuth.verifyUser, function (req, res) {
  Customer.findOne({ _id: req.user._id })
    .then(function (userData) {
      res.status(200).json({ success: true, data:userData });
    console.log(userData)
  });
});


router.get('/profileandroid', customerAuth.verifyUser, function (req, res) {
  Customer.findOne({ _id: req.user._id })
    .then(function (userData) {
    res.status(200).json({ success: true, data: userData });
    console.log(userData);
  });
});

router.put(
  '/customer/update',
  customerAuth.verifyUser,
  customerAuth.verifyCustomer,
  function (req, res) {
    const body = req.body;
    console.log(body);
    const fname = req.body.fname;
    const lname = req.body.lname;
    const username = req.body.username;
    const address = req.body.address;
    const phone = req.body.phone;
    const email = req.body.email;
    const dob = req.body.dob;
    const uid = req.body.id;
    Customer.updateOne(
      { _id: uid },
      {
        fname: fname,
        lname: lname,
        username: username,
        address: address,
        phone: phone,
        email: email,
        dob: dob,
      }
    )
      .then(function (result) {
        console.log(result);
        res
          .status(200)
          .json({
            success: true,
            message: 'User Details Updated Successfully!!',
          });
      })
      .catch(function (e) {
        console.log(e);
        res.status(500).json({ message: e });
      });
  }
);

router.get('/customer/single/:id', function (req, res) {
  const id = req.params.id;
  Customer.findOne({ _id: id })
    .then(function (data) {
      console.log(data);
      res.status(200).json(data);
    })
    .catch(function (e) {
      res.status(500).json({ error: e });
    });
});

router.get('/customer/fetch', function (req, res) {
  Customer.find().then(function (userData) {
    res
      .status(200)
      .json({ success: true, count: userData.length, data: userData });
  });
});

router.put(
  '/customer/update',
  customerAuth.verifyUser,
  customerAuth.verifyCustomer,
  function (req, res) {
    const body = req.body;
    console.log(body);
    const fname = req.body.fname;
    const lname = req.body.lname;
    const username = req.body.username;
    const address = req.body.address;
    const phone = req.body.phone;
    const email = req.body.email;
    const dob = req.body.dob;
    const uid = req.body.id;
    Customer.updateOne(
      { _id: uid },
      {
        fname: fname,
        lname: lname,
        username: username,
        address: address,
        phone: phone,
        email: email,
        dob: dob,
      }
    )
      .then(function (result) {
        console.log(result);
        res
          .status(200)
          .json({
            success: true,
            message: 'User Details Updated Successfully!!',
          });
      })
      .catch(function (e) {
        console.log(e);
        res.status(500).json({ message: e });
      });
  }
);

router.put(
  '/customer/androidupdate',
  customerAuth.verifyUser,
  customerAuth.verifyCustomer,
  function (req, res) {
    const body = req.body;
    console.log(req.file);
    const address = req.body.address;
    const phone = req.body.phone;
    const dob = req.body.dob;
    const uid = req.user._id;
    Customer.updateOne(
      { _id: uid },
      {
        address: address,
        phone: phone,
        dob: dob,
      }
    )
      .then(function (result) {
        console.log(result);
        res.status(200).json({
          success: true,
          message: 'User Details Updated Successfully!!',
          data: result
        });
      })
      .catch(function (e) {
        console.log(e);
        res.status(500).json({ message: e });
      });
  }
);

router.put(
  '/customer/image/:id',
  customerAuth.verifyUser,
  upload.single('imagepp'),
  async function (req, res) {
    if (req.file !== undefined) {
      try {
        const imagepp = await User.findOneAndUpdate(
          { _id: req.params.id },
          { $set: { imagepp: req.file.filename } },
          { new: true }
        );
        res.status(200).json({ success: true, imagepp: imagepp });
      } catch (error) {
        res.status(500).json({ error: error });
      }
    }
  }
);

module.exports = router;
