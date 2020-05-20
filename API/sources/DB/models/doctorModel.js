const mongoose = require('mongoose');
const validator = require('validator');

const doctorSchema = mongoose.Schema({
    lastName:
    {
        type: String,
        required: ["name"],
        validate: {
            validator: function (v) {
                return /^[a-zA-Zäèéêëïö ,-]+$/.test(v);
            },
            message: props => `Error: ${props.value} is not a valid last name!`
        },
    },
    firstName:
    {
        type: String,
        required: ["name"],
        validate: {
            validator: function (v) {
                return /^[a-zA-Zäèéêëïö ,-]+$/.test(v);
            },
            message: props => `Error: ${props.value} is not a valid first name!`
        },
    },
    emailAddr:
    {
        type: String,
        required: true,
        index: true,
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
        required: ["sex"],
        validate: {
            validator: function (v) {
                return /^(male)|(female)$/.test(v);
            },
            message: props => `${props.value} is not a valid sex!`
        },
    },
    age:
    {
        type: Date,
        required: true
    },
    expDomaine:
    {
        type: String,
        required: true
    },
    address:
        { type: String },
    medicalId:
    {
        type: Number,
        required: true,
        index: true,
        unique: true
    }
});

doctorSchema.index({ 'emailAddr': 1, 'medicalId': 1 }, { unique: true });

var doctorModel = mongoose.model('docInfoModel', doctorSchema, 'DoctorInformation');

module.exports = doctorModel;