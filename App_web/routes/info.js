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
    validation: 1,
    feedInfos: function(data) {
        this.lastname = data[0].lastName;
        this.firstname = data[0].firstName;
        this.age = data[0].age;
        this.gender = data[0].gender;
        this.height = data[0].height;
        this.weight = data[0].weight;
        this.emergecyNumber = data[0].emergecyNumber;
        this.allergies = data[0].allergies;
        this.medicalHistory = data[0].medicalHistory;
        this.bloodType = data[0].bloodType;
        this.socialNumber = data[0].socialNumber;
        this.treatments = data[0].treatments;
        this.organDonation = data[0].organDonation;
        this.doctor = data[0].doctor;
        this.validation = 0;
    },
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

/* convert received json into a somekow broken array */
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
            infos.feedInfos(data);
            console.log(infos.validation);
        })
    if (infos.validation === 0) {
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