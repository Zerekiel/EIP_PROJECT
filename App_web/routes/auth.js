var express = require('express');
var router = express.Router();
var request = require('request-promise');


/* GET login page. */
router.get('/', function(req, res) {
    res.render('auth', { title: 'Express' });
});

/* POST account create page */
router.post('/create', (req, res) => {
    res.redirect('/authCreate');
    res.end();
});

/* connexion options object */
var options = {
    url: 'https://healthsafe-api-beta.herokuapp.com/api/signin/create',
    method: 'POST',
    json: {
        email: undefined,
        password: undefined
    },
    feedJson: function(data) {
        this.json.email = data.username;
        this.json.password = data.password;
    }
};

var validation = {
    token: undefined,
    feedCode: function(code) {
        this.code = code;
    }
}

/* await function that handle api's return */
async function performRequest(res) {
    await request(options)
        .then(function(res) {
            validation.feedCode(res.token);
        })
        .catch(function(err) {
            console.log(err);
        })
    if (validation.code !== undefined) {
        res.redirect('/home');
        res.end();
    } else {
        res.redirect('/');
        res.end();
    }
};

/* POST account connexion page */
router.post('/connexion', (req, res) => {
    options.feedJson(req.body);
    performRequest(res);
});

module.exports = router;