var express = require('express');
var router = express.Router();
var request = require('request');
var mynext = false;

/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('auth', { title: 'Express' });
});

router.post('/', function(req, res, next) {
    console.log(req.body);
    request.post('https://healthsafe-api.herokuapp.com/api/connection', {
        json: {
            userName: req.body.username,
            password: req.body.password
        }
    });
    res.redirect('/home');
    res.end();
});

module.exports = router;