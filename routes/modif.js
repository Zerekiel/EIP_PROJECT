var express = require('express');
var router = express.Router();
var request = require('request-promise');
var patientData = require('../customModules/patientData.js');

/* GET modif page */
router.get('/', function(req, res) {
    res.render('modif', {
        firstname: patientData.firstname,
        lastname: patientData.lastname,
        age: patientData.age,
        gender: patientData.gender,
        height: patientData.height,
        weight: patientData.weight,
        emergencyNumber: patientData.emergencyNumber,
        allergies: patientData.allergies,
        medicalHistory: patientData.medicalHistory,
        bloodType: patientData.bloodType,
        socialNumber: patientData.socialNumber,
        treatments: patientData.treatments,
        organDonation: patientData.organDonation,
        doctor: patientData.doctor,
        birthDay: patientData.birthDay
    });
});

/* Options object for /patientData/create request */
var options = {
    url: 'https://x2021healthsafe1051895009000.northeurope.cloudapp.azure.com:5000/api/patientData/create',
    method: 'POST',
    json: {
        firstName: undefined,
        lastName: undefined,
        age: undefined,
        gender: undefined,
        height: undefined,
        weight: undefined,
        emergencyNumber: undefined,
        allergies: undefined,
        medicalHistory: undefined,
        bloodType: undefined,
        socialNumber: undefined,
        treatments: undefined,
        organDonation: undefined,
        doctor: undefined,
        birthDay: undefined
    },
    feedInfos: function(data) {
        this.json.lastName = data.lastname;
        this.json.firstName = data.firstname;
        this.json.age = data.age;
        this.json.gender = data.gender;
        this.json.height = data.height;
        this.json.weight = data.weight;
        this.json.emergencyNumber = data.emergencyNumber;
        this.json.allergies = data.allergies;
        this.json.medicalHistory = data.medicalHistory;
        this.json.bloodType = data.bloodType;
        this.json.socialNumber = data.socialNumber;
        this.json.treatments = data.treatments;
        this.json.organDonation = data.organDonation;
        this.json.doctor = data.doctor;
        this.json.birthDay = data.birthDay;
    },
};

/* await function that wait for the request to end */
async function performRequest(res) {
    await options.feedInfos(patientData);
    console.log(options.json);
    await request(options)
        .then(function(res) {
            patientData.code = res._id;
        })
        .catch(function(err) {
            console.log(err);
        })
    res.redirect('/dispCode');
    res.end();
};

router.post('/sendData', function(req, res) {
    patientData.replaceInfos(req.body);
    patientData.displayInfos();
    performRequest(res);
});

module.exports = router;