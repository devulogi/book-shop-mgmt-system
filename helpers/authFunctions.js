var crypto = require('crypto');

// encrypt password with pbkdf2 algorithm and salt value of 10 iterations
function encryptPassword(password) {
  return crypto.pbkdf2Sync(password, 'salt', 10, 32, 'sha512').toString('hex');
}

// compare password with encrypted password in database using pbkdf2 algorithm and salt value of 10 iterations
function comparePassword(password, encryptedPassword) {
  return encryptPassword(password) === encryptedPassword;
}

// isAuth function to check if user is authenticated or not
function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth');
}

// isAdmin function to check if user is authenticated and is an admin or not
function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.isAdmin) {
    return next();
  }
  res.redirect('/auth');
}

// export functions
module.exports = {
  encryptPassword: encryptPassword,
  comparePassword: comparePassword,
  isAuth: isAuth,
  isAdmin: isAdmin
}
