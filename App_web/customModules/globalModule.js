var express = require('express');

// One module to rule them all

module.exports = {
    connectionStatus = false,
    username = undefined,
    patientCode = undefined,
    updateConnectionStatus: function(status) {
        this.connectionStatus = status;
    },
    updateUsername: function(name) {
        this.username = name;
    },
    updatePatientCode: function(code) {
        this.patientCode = code;
    }
};