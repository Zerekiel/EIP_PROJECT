const mongoose = require('mongoose');
const validator = require('validator');

const doctorSchema = mongoose.Schema({
    lastName:
    {
        type: String,
        minlength: 3,
        maxlength: 30,
        validate: {
            validator: function (v) {
                return /^[a-zA-ZÉäèéêëïö]+(([' -][a-zA-ZÉäèéêëïö ])?[a-zA-ZÉäèéêëïö]*)*$/.test(v);
            },
            message: props => `Error: ${props.value} is not a valid last name!`
        },
    },
    firstName:
    {
        type: String,
        minlength: 3,
        maxlength: 30,
        validate: {
            validator: function (v) {
                return /^[a-zA-ZÉäèéêëïö]+(([' -][a-zA-ZÉäèéêëïö ])?[a-zA-ZÉäèéêëïö]*)*$/.test(v);
            },
            message: props => `Error: ${props.value} is not a valid first name!`
        },
    },
    emailAddr:
    {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
            },
            message: props => `Error: ${props.value} is not a valid email!`
        }
    },
    gender:
    {
        type: String,
        validate: {
            validator: function (v) {
                return /^(male)|(female)$/.test(v);
            },
            message: props => `${props.value} is not a valid sex!`
        },
    },
    birthday:
    {
        type: String,
        required: true,
                validate: {
            validator: function (v) {
                return /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/.test(v);
            },
            message: props => `Error: ${props.value} invalid charactere! Please specify the birday date as follow : DD/MM/YYYY`
        },

    },
    expDomaine:
    {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-ZÉäèéêëïö]*$/.test(v);
            },
            message: props => `Error: ${props.value} invalid charactere!`
        },
    },
    address:
    {
        type: String,
        validate: {
            validator: function (v) {
                return /^([0-9]*, )([A-Za-zéàè ]*, )((0[1-9])|([1-8][0-9])|(9[0-8])|(2A)|(2B))[0-9]{3} [a-zA-Z -]*$/.test(v);
            },
            message: props => `Error: ${props.value} incorrect address, please verify it is formated as follow :\n"1, avenue Paster, 75000 Paris`
        }
    },
    medicalId:
    {
        type: Number,
        required: true,
        unique: true
    }
});

var doctorModel = mongoose.model('docInfoModel', doctorSchema, 'DoctorInformation');
module.exports = doctorModel;
