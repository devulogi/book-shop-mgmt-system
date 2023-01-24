var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('profile', {title: 'Profile', page: 'profile'});
});

module.exports = router;
