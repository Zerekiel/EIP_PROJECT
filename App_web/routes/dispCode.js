var express = require('express');
var router = express.Router();
var patientData = require('../customModules/patientData.js');

/* GET dispCode page */
router.get('/', function(req, res) {
    res.render('dispCode', {
        title: 'Express',
        code: patientData.code
    });
});

module.exports = router;