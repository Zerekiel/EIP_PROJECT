var express = require('express');
var router = express.Router();
var request = require('request-promise');
var patientData = require('../customModules/patientData.js');
var check = require('../customModules/globalModule.js');
var docData = require('../customModules/doctorData.js');
const { get } = require('./getCode.js');

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
    const myAuth = "Bearer ".concat(docData._token);
    getCodeOptions.feedAuth(myAuth);
    getCodeOptions.feedjs(patientData.code);
    getIdCode();
});

var getCodeOptions = {
    url: 'https://x2021healthsafe1051895009000.northeurope.cloudapp.azure.com:5000/api/patientData/sendId',
    method: 'POST',
    json: {
        idTransfert: undefined,
    },
    headers: {
        Authorization: undefined
    },
    feedAuth: function(token) {
        this.headers.Authorization = token;
    },
    feedjs: function(id) {
        this.json.idTransfert = id;
    }
}

async function getIdCode() {
    await request(getCodeOptions)
        .then(function(res) {
            console.log("ID TRANSFERT OK");
        })
        .catch(function(err) {
            console.log(err);
        })
};

module.exports = router;