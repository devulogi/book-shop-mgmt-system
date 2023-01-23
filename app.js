require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var stylus = require('stylus');
var session = require('express-session');
var memoryStore = require('memorystore')(session);
var passport = require('passport');
var flash = require('express-flash');

var { initPassport } = require('./services/passport');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var logoutRouter = require('./routes/logout');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  store: new memoryStore({
    checkPeriod: 3600000 // prune expired entries every 1hour
  })
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
initPassport();

app.use((req, res, next) => {
  res.locals.user = req.user; // Add user to locals for all views to use
  res.locals.isAuthenticated = req.isAuthenticated(); // Add isAuthenticated to locals for all views to use
  res.locals.error = req.flash('error'); // Add error to locals for all views to use
  res.locals.success = req.flash('success'); // Add success to locals for all views to use
  next();
});

app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/logout', logoutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
