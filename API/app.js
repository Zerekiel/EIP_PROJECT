var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var MongoClient = require('mongodb').MongoClient;
// var mongo = require('mongodb');
// var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var mobileRouter = require('./routes/mobile');
var webRouter = require('./routes/web');
var connexionRouter = require('./routes/connexion');


// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// var hostname = 'localhost';
// var port = 3000;
// var new_db = "mongodb://localhost:3000/demo_db";

app.use('/', indexRouter);
app.use('/mobile', mobileRouter);
app.use('/web', webRouter);
app.use('/connexion', connexionRouter);

// app.use('/users', usersRouter);

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
MongoClient.connect("mongodb://localhost:27017/YourDB", { useNewUrlParser: true });
// mongo.connect(new_db , (error , db) => {
// 	if (error){
// 		throw error;
// 	}
//
// 	//CREATING A COLLECTION IN MONGODB USING NODE.JS
// 	db.createCollection("details" , (err , collection) => {
// 		if(err) throw err;
//
// 		console.log("Details collection created successfully");
//
// 	});
// });

module.exports = app;
