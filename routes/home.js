var express = require('express');
var router = express.Router();
var check = require('../customModules/globalModule.js');
var docData = require('../customModules/doctorData.js');

/* GET home page */
router.get('/', function(req, res, next) {
    if (check.connectionStatus === true) {
        res.render('home', {
            name: docData.lastname
        });
    } else {
        res.redirect('/');
        res.end();
    }
});

/* Routes to redirect */

/* redirect options */
router.post('/options', (req, res) => {
    res.redirect('/options');
    res.end();
});

/* redirect deco */
router.post('/deco', (req, res) => {
    res.redirect('/');
    res.end();
});

/* redirect medic profile */
router.post('/profile', (req, res) => {
    res.redirect('/medic');
    res.end();
});

/* redirect medic profile */
router.post('/movingAlong', (req, res) => {
    res.redirect('/getCode');
    res.end();
});

module.exports = router;