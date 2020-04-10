var express = require('express');
var router = express.Router();
var request = require('request');


/* GET login page. */
router.get('/', function(req, res) {
    res.render('auth', { title: 'Express' });
});

var options = {
    url: 'https://healthsafe-api.herokuapp.com/api/connection',
    method: 'POST',
    json: {
        userName: undefined,
        password: undefined
    },
    feedJson: function(value1, value2) {
        this.json.userName = value1;
        this.json.password = value2;
    }
};

var returnCode = {
    code: 0,
    getCode: function(_code) {
        this.code = code;
    }
};

router.post('/', function(req, res, next) {
    options.feedJson(req.body.username, req.body.password);
    request(options, function(req, res) {
        console.log(options.json.userName);
        console.log(options.json.password);
        console.log(res.body);
    });
    //if (returnCode.code === 200) {
    res.redirect('/home');
    res.end();
    //}
});

module.exports = router;