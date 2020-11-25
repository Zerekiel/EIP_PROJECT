var express = require('express');
var router = express.Router();
var patientData = require('../customModules/patientData.js');
var check = require('../customModules/globalModule.js');
var docData = require('../customModules/doctorData.js');

/* GET dispCode page */
router.get('/', function(req, res) {
    if (check.connectionStatus === true) {
        res.render('dispCode', {
            name: docData.lastname,
            code: patientData.code
        });
    } else {
        res.redirect('/');
        res.end();
    }
});

module.exports = router;