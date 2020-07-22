var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
// const expressValidator = require('express-validator');



var MongoClient = require('./db/db.js');

var indexRouter = require('./sources/routes/index');
const swaggerRouter = require('./sources/documentation/config/configDoc');
const documentationRouter = require('./sources/routes/documentation');
const signupRouter = require('./sources/routes/signUp');
const patientDataRouter = require('./sources/routes/patientData');
const drProfileRouter = require('./sources/routes/drProfile');
const signinRouter = require('./sources/routes/signin');
const logoutRouter = require('./sources/routes/logOut');





var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'sources/views'));
app.set('view engine', 'ejs');


//middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'sources/public')));

app.use(helmet());

app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// app.use(expressValidator());


// routes
app.use('/', indexRouter);
app.use('/api', documentationRouter);
app.use('/api/signup', signupRouter);
app.use('/api/patientData', patientDataRouter);
app.use('/api/drProfile', drProfileRouter);
app.use('/api/signin', signinRouter);
app.use('/api/logOut', logoutRouter);



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
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
