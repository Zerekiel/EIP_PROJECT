var express = require('express');
var router = express.Router();
var request = require('request-promise');
var check = require('../customModules/globalModule.js');
var patientData = require('../customModules/patientData.js');
var docData = require('../customModules/doctorData.js');

/* Get getCode page */
router.get('/', function(req, res) {
    if (check.connectionStatus === true) {
        res.render('getCode', {
            name: docData.lastname
        });
    } else {
        res.redirect('/');
        res.end();
    }
});

/* Options object for getting patient data */
var options = {
    url: 'https://x2021healthsafe1051895009000.northeurope.cloudapp.azure.com:5000/api/patientData/patientDataId',
    method: 'GET',
    json: {
        _id: undefined
    },
    feedCode: function(id) {
        this.json._id = id;
    }
};

var getCodeOptions = {
    url: 'https://x2021healthsafe1051895009000.northeurope.cloudapp.azure.com:5000/api/patientData/receiveId',
    method: 'GET',
    headers: {
        Authorization: undefined
    },
    feedAuth: function(token) {
        this.headers.Authorization = token;
    }
}

/* await function that wait for the request to end */
async function performRequest(res) {
    await request(options)
        .then(function(res) {
            patientData.feedInfos(res);
            patientData.checkStatus();
        })
        .catch(function(err) {
            console.log(err);
        })
    if (patientData.status === 1) {
        res.redirect('/info');
        res.end();
    } else {
        console.log("Data invalid");
        res.redirect('/getCode');
        res.end();
    }
};

async function getIdCode(res) {
    await request(getCodeOptions)
        .then(function(res) {
            console.log(JSON.parse(res)[0]);
            options.feedCode(JSON.parse(res)[0]);
        })
        .catch(function(err) {
            console.log(err);
        })
    performRequest(res);
};

/* POST route for getting the code */
router.post('/code', (req, res) => {
    console.log(req.body.id);
    options.feedCode(req.body.id);
    performRequest(res);
});

/* POST route for getting the code */
router.post('/auto', (req, res) => {
    const myAuth = "Bearer ".concat(docData._token);
    getCodeOptions.feedAuth(myAuth);
    getIdCode(res);
});

/* Routes to redirect */

// Redirect home
router.post('/home', (req, res) => {
    res.redirect('/home');
    res.end();
});

// Redirect options
router.post('/options', (req, res) => {
    res.redirect('options');
    res.end();
});

router.post('/profile', (req, res) => {
    res.redirect('/medic');
    res.end();
});

module.exports = router;