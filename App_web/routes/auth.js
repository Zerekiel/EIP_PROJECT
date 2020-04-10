var express = require('express');
var router = express.Router();
var request = require('request');
var _username = undefined;
var _password = undefined;

/* GET login page. */
router.get('/', function(req, res) {
    res.render('auth', { title: 'Express' });
    //console.log(res.body);
});

router.post('/', function(req, res, next) {
    _username = req.body.username;
    _password = req.body.password;
    request.post('https://healthsafe-api.herokuapp.com/api/connection', function() {
        json: {
            userName: _username,
            password: _password
        }
    });
    res.redirect('/home');
    res.end();
});






module.exports = router;