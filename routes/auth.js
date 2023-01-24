var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET auth page. */
router.get('/', function(req, res, next) {
  res.render('auth', { title: 'Authentication', page: 'auth' });
});

/* POST auth page. */
router.post('/', function (req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      req.flash('error', info.message);
      return res.redirect('/auth');
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      req.flash('success', 'You have successfully logged in.');
      return res.redirect('/');
    });
  })(req, res, next);
});

module.exports = router;
