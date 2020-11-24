var express = require('express');
var patientData = require("./../customModules/patientData");
var doctorData = require("./../customModules/doctorData.js");

// One module to rule them all

module.exports = {
    connectionStatus: false,
    username: undefined,
    patientCode: undefined,
    updateConnectionStatus: function(token) {
        if (token != null)
            this.connectionStatus = true;
    },
    updateUsername: function() {
        this.username = doctorData.lastname;
    },
    updatePatientCode: function(code) {
        this.patientCode = code;
    }
};

// global value
/*
- status connexion
|-> based on the return code of the connexion
- status medecin data
|-> based on the module containing the data
- status patient data
|-> base on the module containing the data
*/