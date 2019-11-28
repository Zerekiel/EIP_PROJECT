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
// var connexionRouter = require('./sources/routes/connexion');
var connectionRouter = require('./sources/routes/connexion');
var testRouter = require('./sources/routes/test');
var stockRouter = require('./sources/routes/stock');
var documentationRouter = require('./sources/routes/documentation');
var signInRouter = require('./sources/routes/signIn');
var signIn2Router = require('./sources/routes/signIn2');

var signUpRouter = require('./sources/routes/signUp');


var swaggerRouter = require('./sources/Documentation/configDoc');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'sources/views'));
app.set('view engine', 'ejs');

// Load all middlewares
// Stylesheets engine setup

app.use(express.static(path.join(__dirname, 'sources/public/stylesheets')));
app.use(express.static(path.join(__dirname, 'sources/public/scriptJS')));






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
// app.use('/signup', indexRouter);
// app.use('/mobile', mobileRouter);
// app.use('/web', webRouter);
// app.use('/connexion', connexionRouter);
app.use('/api/connection', connectionRouter);
// app.use('/test', testRouter);
app.use('/api/stock', stockRouter);
app.use('/api/signin', signInRouter);
app.use('/api/signin2', signIn2Router);
app.use('/api/signup', signUpRouter);


// app.use('/docs', documentationRouter);
app.use('/api', documentationRouter);
app.use('/swagger.json', swaggerRouter);



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
  // res.status(err.status || 500);
  // res.render('error');
  if (res.status(err.status).statusCode === 404) {
          console.log("ERR STATUS 404 : ")
         //console.log(res.status(err.status))
         res.status(404);
         res.render('error404');

  } else {
          console.log("ERR STATUS : ")
          console.log(err.status)
          console.log(res.status(err.status).statusCode)
         // console.log(res.status(err.status))
          res.status(err.status || 500);
          res.render('error');
  }

});

module.exports = app;
