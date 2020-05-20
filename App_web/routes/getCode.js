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
    res.redirect('/info');
    res.end();
};

/* POST route for getting the code */
router.post('/code', (req, res) => {
    options.feedCode(req.body.id);
    performRequest(res);
});

module.exports = router;