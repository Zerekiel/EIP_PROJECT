var express = require('express');
var router = express.Router();
var request = require('request-promise');
var check = require('../customModules/globalModule.js');
var doc = require('../customModules/doctorData.js');


/* GET login page. */
router.get('/', function(req, res) {
    res.render('auth', { title: 'Express' });
});

/* connexion options object */
var options_connect = {
    url: 'https://x2021healthsafe1051895009000.northeurope.cloudapp.azure.com:5000/api/drSignin',
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

var get_doc_data = {
    url: 'https://x2021healthsafe1051895009000.northeurope.cloudapp.azure.com:5000/api/drProfile/drProfileId',
    method: 'GET',
    json: {
        _id: undefined
    },
    feed_json_id: function(id) {
        this.json._id = id;
    }
};

/* complete doc profile after login */
async function doctorRequest(res) {
    await request(get_doc_data)
        .then(function(req) {
            doc.feedInfos(req);
        })
        .catch(function(err) {
            console.log(err);
        })
    if (check.connectionStatus === true && doc.status === true) {
        res.redirect('/home');
        res.end();
    } else {
        res.redirect('/');
        res.end();
    }
};

/* await function that handle api's return */
async function performRequest(res) {
    await request(options_connect)
        .then(function(res) {
            check.updateConnectionStatus(res.token);
            doc.feed_id(res.id);
            doc.feed_token(res.token);
            console.log(doc._token);
            get_doc_data.feed_json_id(doc._id);
        })
        .catch(function(err) {
            console.log(err);
        })
    doctorRequest(res);
};

/* POST account connexion page */
router.post('/connexion', (req, res) => {
    options_connect.feedJson(req.body);
    performRequest(res);
    console.log("CONNEXION OK");
});

/* POST account create page */
router.post('/create', (req, res) => {
    res.redirect('/authCreate');
    res.end();
});

module.exports = router;