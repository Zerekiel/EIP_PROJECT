var   createError = require('http-errors');
var   path = require('path');
var   express = require('express');

var   app_web = express();
const port = 8080

app_web.set('views', __dirname + '/views');
app_web.use(express.static('views'));
app_web.engine('html', require('ejs').renderFile);
app_web.set('view engine', 'html');

//catch 404 and forward to error handler;
//app_web.use(function(req, res, next) {
  //next(createError(404));
//});

app_web.get('/', function(request, response){
    response.render('auth.html');
});

app_web.listen(port, function(){
  console.log('client is currently running on port ' + port)
});

module.exports = app_web;
