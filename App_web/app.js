var createError = require('http-errors');
//var cons = require('consolidate');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//var healthsafe = require("./javascripts/globalModule/js");


// routes for the views
var authRouter = require('./routes/auth');
var homeRouter = require('./routes/home');
var infoRouter = require('./routes/info');
var scanRouter = require('./routes/scan');

var app = express();
const port = 8080;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authRouter);
app.use('/home', homeRouter);
app.use('/info', infoRouter);
app.use('/scan', scanRouter);

//global check of connection status in the web client
/*

if (connectionStatus ===  true) {
    app.use('/home', homeRouter);
    app.use('/info', infoRouter);
    app.use('/scan', scanRouter);
} else {
    app.use('/unvalidData', );
    app.use('/info', infoRouter);
    app.use('/scan', scanRouter);
}

*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next("404 Not Found");
    //next(createError(404));
});

// error handler
/*app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});*/

module.exports = app;