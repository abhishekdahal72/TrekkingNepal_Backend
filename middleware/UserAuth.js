const jwt = require('jsonwebtoken');
const Customer = require('../models/UserModel');

module.exports.verifyUser = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const data = jwt.verify(token, 'secretkey');
    Customer.findOne({ _id: data.uid })
      .then(function (result) {
        //Success
        req.user = result;
        next();
      })
      .catch(function (result) {
        //invalid
        res.status('403').json({ error: 'Auth Failed' });
      });
  } catch (e) {
    res.status(403).json({ error: e });
  }
};

// second guard
module.exports.verifyAdmin = function (req, res, next) {
  console.log(req.user);
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized!!' });
  } else if (req.user.userType !== 'admin') {
    return res.status(401).json({ message: 'Permission denied!!' });
  }
  next();
};

//third guard
module.exports.verifyCustomer = function (req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: 'unauthorized!!' });
  } else if (req.user.userType !== 'user') {
    return res.status(401).json({ message: 'Unauthorized!!' });
  }
  next();
};
