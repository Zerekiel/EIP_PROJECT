var express = require('express');
var router = express.Router();
var request = require('request-promise');
var patientData = require('../customModules/patientData.js');

/* GET info page */
router.get('/', function(req, res) {
    res.render('info', {
        title: 'Express',
        firstname: patientData.firstname,
        lastname: patientData.lastname,
        age: patientData.age,
        gender: patientData.gender,
        height: patientData.height,
        weight: patientData.weight,
        emergencyNumber: patientData.emergencyNumber,
        socialNumber: patientData.socialNumber,
        doctor: patientData.doctor,
        bloodType: patientData.bloodType,
        allergies: patientData.allergies,
        treatments: patientData.treatments,
        organDonation: patientData.organDonation,
        medicalHistory: patientData.medicalHistory
    });
});

/* Options object for /patientData/create request */
var options = {
    url: 'https://healthsafe-api-beta.herokuapp.com/api/patientData/create',
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
        doctor: undefined
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
    },
};

/* await function that wait for the request to end */
async function performRequest(res) {
    options.feedInfos(patientData);
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

/* POST route for validation */
router.post('/validation', (req, res) => {
    performRequest(res);
});

/* POST route for modification */
router.post('/modification', (req, res) => {
    res.redirect('/modif');
    res.end();
});

// route de renvoi : /api/patientData/create

module.exports = router;