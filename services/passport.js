var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.model');

function initPassport() {
  // serialize user
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // deserialize user
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  // local strategy
  passport.use(new LocalStrategy(
      function (username, password, done) {
        User.findOne({username: username}, function (err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, {message: 'Incorrect username.'});
          }
          if (!user.comparePassword(password)) {
            return done(null, false, {message: 'Incorrect password.'});
          }
          return done(null, user);
        });
      }
  ));
}

// export passport
module.exports = {
  initPassport: initPassport
};
