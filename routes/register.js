var express = require('express');
var router = express.Router();
var User = require('../models/user.model');

/* GET register page. */
router.get('/', function (req, res, next) {
  res.render('register', {title: 'Register', page: 'register'});
});

/* POST register a new user. */
router.post('/', function (req, res) {
  // Check if the user already exists
  User.findOne({username: req.body.username}, function (err, user) {
    if (err) {
      return next(err);
    }
    if (user) {
      req.flash('error', 'User already exists');
      return res.redirect('/register');
    }

    // Create a new user
    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });

    // Save the user
    newUser.save(function (err) {
      if (err) {
        return next(err);
      }
      req.flash('success', 'User created');
      res.redirect('/auth');
    });
  })
});

module.exports = router;
