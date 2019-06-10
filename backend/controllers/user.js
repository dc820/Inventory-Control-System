const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
          email: req.body.email,
          password: hash
        });
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'User Created',
            result: result
          })
        .catch(err => {
          res.status().json({
            error: err
          });
        })
      });
    });
}

exports.login = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
  .then(user => {
    if (!user) {
      return res.status(401).json({
        message: 'Auth Failed At Not User'
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
    if (!result) {
      return res.status(401).json({
        message: 'Auth Failed At Compare'
      });
    }
    // Create JSON Web Token Here
    const token = jwt.sign(
      { email: fetchedUser.email,userId: fetchedUser._id },
      'secret_this_should_be_longer',
      { expiresIn: '1h' } // Can send back in hours, minutes, and seconds, example 1h
    );
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      user: req.body.email
    })
  })
  .catch(err => {
    console.log(err)
    return res.status(401).json({
      message: 'Auth Failed At Catch'
    });
  });
}
