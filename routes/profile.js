var express = require('express');
var router = express.Router();
var { isAuth } = require('../helpers/authFunctions');

router.get('/', isAuth, function (req, res, next) {
  res.render('profile', {title: 'Profile', page: 'profile'});
});

module.exports = router;
