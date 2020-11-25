var express = require('express');

module.exports = {
    _id: undefined,
    _token: undefined,
    lastname: undefined,
    firstname: undefined,
    age: undefined,
    birthday: undefined,
    phoneNumber: undefined,
    address: undefined,
    email: undefined,
    expertiseDomain: undefined,
    idNumber: undefined,
    socialNumber: undefined,
    status: undefined,
    feed_id: function(id) {
        this._id = id;
    },
    feed_token: function(token) {
        this._token = token;
    },
    feedInfos: function(data) {
        this.lastname = data.lastName;
        this.firstname = data.firstName;
        this.age = data.age;
        this.birthday = data.birthDay;
        this.phoneNumber = data.phoneNumber;
        this.address = data.address;
        this.email = data.email;
        this.expertiseDomain = data.expertiseDomain;
        this.idNumber = data.idNumber;
        this.socialNumber = data.socialNumber;
        this.checkStatus();
    },
    displayInfos: function() {
        console.log(this._id, this.lastname, this.firstname, this.age, this.birthday,
            this.phoneNumber, this.address, this.email, this.expertiseDomain, this.idNumber,
            this.socialNumber);
    },
    checkStatus: function() {
        if (this._id != undefined && this.lastname != undefined && this.firstname != undefined &&
            this.age != undefined && this.birthday != undefined && this.phoneNumber != undefined &&
            this.address != undefined && this.email != undefined && this.expertiseDomain != undefined &&
            this.idNumber != undefined && this.socialNumber != undefined) {
            this.status = true;
        } else {
            this.status = false;
        }
    }
};