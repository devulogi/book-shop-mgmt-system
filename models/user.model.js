const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { encryptPassword, comparePassword } = require('../helpers/authFunctions');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date,
  },
  lastLogin: {
    type: Date,
  }
});

UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = encryptPassword(this.password);
  }
  next();
});

UserSchema.methods.comparePassword = function(password) {
  return comparePassword(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
