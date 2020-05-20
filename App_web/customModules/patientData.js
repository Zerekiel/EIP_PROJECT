var express = require('express');

module.exports = {
    lastname: undefined,
    firstname: undefined,
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
    code: undefined,
    feedInfos: function(data) {
        this.lastname = data.lastName;
        this.firstname = data.firstName;
        this.age = data.age;
        this.gender = data.gender;
        this.height = data.height;
        this.weight = data.weight;
        this.emergencyNumber = data.emergencyNumber;
        this.allergies = data.allergies;
        this.medicalHistory = data.medicalHistory;
        this.bloodType = data.bloodType;
        this.socialNumber = data.socialNumber;
        this.treatments = data.treatments;
        this.organDonation = data.organDonation;
        this.doctor = data.doctor;
    },
    displayInfos: function() {
        console.log(this.lastname, this.firstname, this.age, this.gender, this.height,
            this.weight, this.emergencyNumber, this.allergies, this.medicalHistory,
            this.bloodType, this.socialNumber, this.treatments, this.organDonation,
            this.doctor);
    }
};