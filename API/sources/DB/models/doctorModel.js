const mongoose = require('mongoose');
const validator = require('validator');

const doctorSchema = mongoose.Schema({
    lastName :
                {type : String,
                required : ["name"],
                properties: {
                    "name": { type:"string", pattern: /^[a-zA-Zäèéêëïö ,-]+$/}}
                },
    firstName :
                {type : String,
                required : ["name"],
                properties: {
                    "name": { type:"string", pattern: /^[a-zA-Zäèéêëïö ,-]+$/}}},
    emailAddr :
                {type : String,
                required: ["email"],
                properties: {
                    "email": {type: "string", pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/}}},
    gender :
                {type : String,
                required: ["sex"],
                properties: {
                    "sex": {type : "string", pattern: /^(male)|(female)$/}}},
    age :
                {type : Number,
                required : true},
    expDomaine :
                {type : String,
                required : true},
    address :
                {type : String},
    medicalId :
                {type : Number,
                required : true,
                unique : true}
});

var doctorModel = mongoose.model('docInfoModel', doctorSchema, 'DoctorInformation');

module.exports = doctorModel;
