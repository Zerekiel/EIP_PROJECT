var express = require('express');
var router = express.Router();
var request = require('request-promise');


/* GET login page. */
router.get('/', function(req, res) {
    res.render('auth', { title: 'Express' });
});

var options = {
    url: 'https://healthsafe-api.herokuapp.com/api/signin',
    method: 'POST',
    json: {
        userName: undefined,
        password: undefined
    },
    feedJson: function(_username, _password) {
        this.json.userName = _username;
        this.json.password = _password;
    }
};

var returnCode = {
    code: 0,
    getCode: function(_code) {
        this.code = _code;
    }
};

router.post('/', function(req, res, next) {
    options.feedJson(req.body.username, req.body.password);
    request(options)
        .catch(function(err) {
            returnCode.getCode(err.statusCode);
        });
    if (returnCode.code === 200) {
        console.log("all clear");

        res.redirect('/home');
        res.end();
    } else {
        console.log("wrong id");
        res.redirect('/');
        res.end();
    }
});

module.exports = router;