var express = require('express');
var router = express.Router();
var request = require('request-promise');
var patientData = require('../customModules/patientData.js');

/* Get getCode page */
router.get('/', function(req, res) {
    res.render('getCode', { title: 'Express' });
});

/* Options object for getting patient data */
var options = {
    url: 'https://healthsafe-api-beta.herokuapp.com/api/patientData/patientDataId',
    method: 'GET',
    json: {
        _id: undefined
    },
    feedCode: function(id) {
        this.json._id = id;
    }
};

/* await function that wait for the request to end */
async function performRequest(res) {
    await request(options)
        .then(function(res) {
            patientData.feedInfos(res);
        })
        .catch(function(err) {
            console.log(err);
        })
    patientData.checkStatus();
    if (patientData.status === 1) {
        res.redirect('/info');
        res.end();
    } else {
        console.log("Data unvalid");
        res.redirect('/getCode');
        res.end();
    }
};

/* POST route for getting the code */
router.post('/code', (req, res) => {
    options.feedCode(req.body.id);
    performRequest(res);
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