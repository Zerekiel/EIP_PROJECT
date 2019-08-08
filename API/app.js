// All require for the different depencies.
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var assert = require('assert');
var dotenv = require('dotenv').config(); // config for load dotenv
let bodyParser = require('body-parser');

var url = require('url');


// Require for DB.
// var MongoClient = require('mongodb').MongoClient;
var MongoClient = require('./sources/DB/config/dbCreationAndConnection').MongoClient;
let mongoose = require('mongoose');


// Require for routes.
// var indexRouter = require('./routes/index');
// var mobileRouter = require('./routes/mobile');
// var webRouter = require('./routes/web');
// var connexionRouter = require('./routes/connexion');

var indexRouter = require('./sources/routes/index');
var mobileRouter = require('./sources/routes/mobile');
var webRouter = require('./sources/routes/web');
var connexionRouter = require('./sources/routes/connexion');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'sources/views'));
app.set('view engine', 'ejs');

// Stylesheets engine setup
app.use(express.static(path.join(__dirname, 'sources/public/stylesheets')));

// for build to mode DEV / DEBBUG
app.use(logger('dev'));

// I d'ont know for the moment
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(bodyParser.json());

// For understand JSON format ?
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// I d'ont know for the moment
app.use(cookieParser());

// For initialize routes
app.use('/', indexRouter);
app.use('/signup', indexRouter);
app.use('/mobile', mobileRouter);
app.use('/web', webRouter);
app.use('/connexion', connexionRouter);


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
