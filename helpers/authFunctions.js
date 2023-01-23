var crypto = require('crypto');

// encrypt password with pbkdf2 algorithm and salt value of 10 iterations
function encryptPassword(password) {
  return crypto.pbkdf2Sync(password, 'salt', 10, 32, 'sha512').toString('hex');
}

// compare password with encrypted password in database using pbkdf2 algorithm and salt value of 10 iterations
function comparePassword(password, encryptedPassword) {
  return encryptPassword(password) === encryptedPassword;
}

// export functions
module.exports = {
  encryptPassword: encryptPassword,
  comparePassword: comparePassword
}
