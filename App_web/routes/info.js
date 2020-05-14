var express = require('express');
var router = express.Router();
var request = require('request-promise')

/*router.get('/', function(req, res) {
    res.render('info', { title: 'Express' });
});*/

/* object that contain patient infos */
var infos = {
    lastname: undefined,
    firstname: undefined,
    age: undefined,
    gender: undefined,
    height: undefined,
    weight: undefined,
    emergecyNumber: undefined,
    allergies: undefined,
    medicalHistory: undefined,
    bloodType: undefined,
    socialNumber: undefined,
    treatments: undefined,
    organDonation: undefined,
    doctor: undefined,
    received: true,
    feedInfos: function(user_data) {
        this.lastname = user_data.lastName;
        this.firstname = user_data.firstName;
        this.age = user_data.age;
        this.gender = user_data.gender;
        this.height = user_data.height;
        this.weight = user_data.weight;
        this.emergecyNumber = user_data.emergecyNumber;
        this.allergies = user_data.allergies;
        this.medicalHistory = user_data.medicalHistory;
        this.bloodType = user_data.bloodType;
        this.socialNumber = user_data.socialNumber;
        this.treatments = user_data.treatments;
        this.organDonation = user_data.organDonation;
        this.doctor = user_data.doctor;
    },
    allClear: function(value) {
        this.received = value;
    }
};

/* Options object for patient infos request */
var options = {
    url: 'https://healthsafe-api-beta.herokuapp.com/api/patientData/patientDataId',
    method: 'GET',
    json: {
        //_id: undefined
        _id: '5e9cca8c21f92f3e3bb019d8'
    }
};

/* convert received json into a broken array */
function json2array(json) {
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function(key) {
        result.push(json[key]);
    });
    return result;
}

/* GET info page */
router.get('/', function(req, res, next) {
    request(options)
        .then(function(res) {
            var data = json2array(res);
            console.log(data[0].firstName);
            //infos.feedInfos(res);
            //infos.allClear(true);
            //change allClear value to false
            //var jsonOBJ = { 'key': 'value' };
        })
    if (infos.receive === true) {
        res.render('info', {
            firstname: infos.firstname,
            lastname: infos.lastname,
            age: infos.age,
            gender: infos.gender,
            height: infos.height,
            weight: infos.weight,
            emergecyNumber: infos.emergecyNumber,
            socialNumber: infos.socialNumber,
            doctor: infos.doctor,
            bloodType: infos.bloodType,
            allergies: infos.allergies,
            treatments: infos.treatments,
            organDonation: infos.organDonation,
            medicalHistory: infos.medicalHistory
        });
    }
});



//pour le systeme de modification, on fait un bouton de modification par colonne
//plus simple à gérer
// maybe ajout d'un systeme de menu pour les catégories à choix défini
// -> ou alors un check paramètre après

// + un bouton de renvoi de information 
// route de renvoi : /api/patientData/create

module.exports = router;