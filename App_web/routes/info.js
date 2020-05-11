var express = require('express');
var router = express.Router();
var request = require('request')

var infos = {
    lastname: undefined,
    firstname: undefined,
    age: undefined,
    gender: undefined,
    emergecyNumber: undefined,
    allergies: undefined,
    medicalHistory: undefined,
    bloodType: undefined,
    socialNumber: undefined,
    treatments: undefined,
    organDonation: undefined,
    doctor: undefined,
    feedInfos: function(user_data) {
        this.lastname = user_data.lastname;
        this.firstname = user_data.firstname;
        this.age = user_data.age;
        this.gender = user_data.gender;
        this.emergecyNumber = user_data.emergecyNumber;
        this.allergies = user_data.allergies;
        this.medicalHistory = user_data.medicalHistory;
        this.bloodType = user_data.bloodType;
        this.socialNumber = user_data.socialNumber;
        this.treatments = user_data.treatments;
        this.organDonation = user_data.organDonation;
        this.doctor = user_data.doctor;
    }
};

/* Options object for patient infos request */
var options = {
    url: 'https://healthsafe-api.herokuapp.com/api/stock',
    method: 'POST',
    json: {
        code: undefined
    }
};

/* GET info page */
router.get('/', function(req, res, next) {
    request(options, function(req, res, next) {
        infos.feedInfos(res.body);
        console.log(res.body);
    });
    res.render('info', {
        firstname: infos.firstname,
        lastname: infos.lastname,
        age: infos.age,
        gender: infos.gender,
        emergecyNumber: infos.emergecyNumber,
        socialNumber: infos.socialNumber,
        doctor: infos.doctor,
        bloodType: infos.bloodType,
        allergies: infos.allergies,
        treatments: infos.treatments,
        organDonation: infos.organDonation,
        medicalHistory: infos.medicalHistory
    });
});

//pour le systeme de modification, on fait un bouton de modification par colonne
//plus simple à gérer
// + un bouton de renvoi de information 

module.exports = router;