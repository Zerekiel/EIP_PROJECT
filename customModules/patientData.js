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
    birthDay: undefined,
    code: undefined,
    status: undefined,
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
        this.birthDay = data.birthDay;
    },
    displayInfos: function() {
        console.log(this.lastname, this.firstname, this.age, this.gender, this.height,
            this.weight, this.emergencyNumber, this.allergies, this.medicalHistory,
            this.bloodType, this.socialNumber, this.treatments, this.organDonation,
            this.doctor, this.birthDay);
    },
    replaceInfos: function(data) {
        if (data.lastname !== "") {
            this.lastname = data.lastname;
        }
        if (data.firstname !== "") {
            this.firstname = data.firstname;
        }
        if (data.age !== "") {
            this.age = parseInt(data.age);
        }
        if (data.gender !== "") {
            this.gender = data.gender;
        }
        if (data.height !== "") {
            this.height = parseInt(data.height);
        }
        if (data.weight !== "") {
            this.weight = parseInt(data.weight);
        }
        if (data.emergencyNumber !== "") {
            this.emergencyNumber = data.emergencyNumber;
        }
        if (data.allergies !== "") {
            this.allergies = data.allergies;
        }
        if (data.medicalHistory !== "") {
            this.medicalHistory = data.medicalHistory;
        }
        if (data.bloodType !== "") {
            this.bloodType = data.bloodType;
        }
        if (data.socialNumber !== "") {
            this.socialNumber = data.socialNumber;
        }
        if (data.treatments !== "") {
            this.treatments = data.treatments;
        }
        if (data.organDonation !== "") {
            this.organDonation = data.organDonation;
        }
        if (data.doctor !== "") {
            this.doctor = data.doctor;
        }
        if (data.birthDay !== "") {
            this.birthDay = data.birthDay;
        }
    },
    checkStatus: function() {
        if (this.firstname != undefined && this.lastname != undefined && this.age != undefined &&
            this.gender != undefined && this.height != undefined && this.weight != undefined &&
            this.emergencyNumber != undefined && this.allergies != undefined && this.medicalHistory != undefined &&
            this.bloodType != undefined && this.socialNumber != undefined && this.treatments != undefined &&
            this.organDonation != undefined && this.doctor != undefined && this.birthDay != undefined) {
            this.status = 1;
        } else {
            this.status = 0;
        }
    }
};