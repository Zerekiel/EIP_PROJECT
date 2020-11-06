var createError = require('http-errors');
var cons = require('consolidate');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//var overallData = require("./customModules/globalModule.js");

/* HANDLERS of the routes */

// Handlers for connexion routes 
var authRouter = require('./routes/auth');
var authCreateRouter = require('./routes/authCreate');

// Handlers for home / options / profile routes
var homeRouter = require('./routes/home');
var scanRouter = require('./routes/scan');
//var optionsRouter = require('./routes/options');
//var medicRouter = require('./routes/medic');

// Handlers for patient data routes
var getCodeRouter = require('./routes/getCode');
var infoRouter = require('./routes/info');
var modifRouter = require('./routes/modif');
var dispCodeRouter = require('./routes/dispCode');

var app = express();
const port = 8080;

// view engine setup
/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');*/

app.engine('html', cons.swig);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* USE of the routes */

// Connexion routes
app.use('/', authRouter);
app.use('/authCreate', authCreateRouter);

// Home / options / profile routes
app.use('/home', homeRouter);
//app.use('/options', optionsRouter);
//app.use('/medic', medicRouter);

// Patient data routes
app.use('/scan', scanRouter);
app.use('/getCode', getCodeRouter);
app.use('/info', infoRouter);
app.use('/modif', modifRouter);
app.use('/dispCode', dispCodeRouter);

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