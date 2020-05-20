var express = require('express');
var router = express.Router();
var patientData = require('../customModules/patientData.js');

/* GET info page */
router.get('/', function(req, res) {
    console.log("ici on affiche");
    console.log(patientData.firstname);
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

// next error to handle is the display of the info on the front
// perhaps due to the router().post / router().get utilisation
// have to look at the tuto on internet to get better knowledge about it


//pour le systeme de modification, on fait un bouton de modification par colonne
//plus simple à gérer
// maybe ajout d'un systeme de menu pour les catégories à choix défini
// -> ou alors un check paramètre après

// + un bouton de renvoi de information 
// route de renvoi : /api/patientData/create

module.exports = router;