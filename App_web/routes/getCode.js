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

/* await function to wait for request */
async function performRequest(res) {
    await request(options)
        .then(function(res) {
            console.log("ici c'est ce qu'on reçoit");
            console.log(res);
            console.log("ici on va remplir");
            patientData.feedInfos(res);
            console.log(patientData.displayInfos());
        })
        .catch(function(err) {
            console.log(err);
        })
    console.log("ici on a rempli");
    console.log(patientData.firstname);
    res.redirect('/info');
    res.end();
};

router.post('/code', (req, res) => {
    options.feedCode(req.body.id);
    console.log(options.json._id);
    performRequest(res);
});

module.exports = router;