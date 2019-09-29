// All require for the different depencies.
// require for manage errors
var createError = require('http-errors');

// require for Express Framework
var express = require('express');

var path = require('path'); // ?
var cookieParser = require('cookie-parser'); // ?

// require for build to mode DEV / DEBBUG
var logger = require('morgan');

// var assert = require('assert');

// require create and call .env file
// .config for load dotenv
var dotenv = require('dotenv').config();

// require for parse body
let bodyParser = require('body-parser');

// Require for parse url.
var url = require('url');

require('util').inspect.defaultOptions.depth = null


// Require for routes.
var indexRouter = require('./sources/routes/index');
var mobileRouter = require('./sources/routes/mobile');
var webRouter = require('./sources/routes/web');
var connexionRouter = require('./sources/routes/connexion');
var testRouter = require('./sources/routes/test');
var stockRouter = require('./sources/routes/stock');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'sources/views'));
app.set('view engine', 'ejs');

// Load all middlewares
// Stylesheets engine setup
app.use(express.static(path.join(__dirname, 'sources/public/stylesheets')));

// for build to mode DEV / DEBBUG
app.use(logger('dev'));

// bodyParser setup
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(bodyParser.json());

// For understand JSON format ?
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ?
app.use(cookieParser());

// For load routes
app.use('/', indexRouter);
app.use('/signup', indexRouter);
app.use('/mobile', mobileRouter);
app.use('/web', webRouter);
// app.use('/connexion', connexionRouter);
app.use('/test', testRouter);
// app.use('/stock', stockRouter);


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
