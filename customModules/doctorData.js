var express = require('express');

module.exports = {
    id: undefined,
    lastname: undefined,
    firstname: undefined,
    age: undefined,
    phoneNumber: undefined,
    address: undefined,
    email: undefined,
    expertiseDomain: undefined,
    status: undefined,
    feedInfos: function(data) {
        this.id = data._id;
        this.lastname = data.lastName;
        this.firstname = data.firstName;
        this.age = data.age;
        this.phoneNumber = data.phoneNumber;
        this.address = data.address;
        this.email = data.email;
        this.expertiseDomain = data.expertiseDomain;
        this.checkStatus();
    },
    displayInfos: function() {
        console.log(this.id, this.lastname, this.firstname, this.age,
            this.phoneNumber, this.address, this.email, this.expertiseDomain);
    },
    checkStatus: function() {
        if (this.id != undefined && this.lastname != undefined && this.firstname != undefined &&
            this.age != undefined && this.phoneNumber != undefined && this.address != undefined &&
            this.email != undefined && this.expertiseDomain != undefined) {
            this.status = 1;
        } else {
            this.status = 0;
        }
    }
};