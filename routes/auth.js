var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET auth page. */
router.get('/', function(req, res, next) {
  res.render('auth', { title: 'Authentication' });
});

/* POST auth page. */
router.post('/', passport.authenticate('local', {
  successRedirect: '/',
  successFlash: 'Welcome!',
  failureRedirect: '/auth',
  failureFlash: true
}));

module.exports = router;
