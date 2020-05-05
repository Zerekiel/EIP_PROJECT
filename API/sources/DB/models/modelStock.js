const mongoose = require('mongoose');

const stockSchema = mongoose.Schema({
	lastName :
		{type : String,
		required : ["name"],
		properties: {
			"name": { type:"string", pattern: /^[a-zA-Zäèéêëïö ,-]+$/}}},

	firstName :
		{type : String,
        required : ["name"],
        properties: {
            "name": { type:"string", pattern: /^[a-zA-Zäèéêëïö ,-]+$/}}},
	age :
	{
		type : Number
	},
	gender :
		{type : String,
        required: ["sex"],
        properties: {
            "sex": {type : "string", pattern: /^(male)|(female)$/}}},
	emergencyNumber :
	{
		type : String
	},
	allergies :
	{
		type : String
	},
	medicalHistory :
	{
		type : String
	},
	bloodType :
	{
		type : String
	},
	socialNumber :
	{
		type : String,
		unique : true,
		required : true,
		trim : true
	},
	treatments :
	{
		type : String
	},
	organDonation :
	{
		type : String
	},
	doctor :
	{
		type : String
	}
});

var modelStock = mongoose.model('modelStock', stockSchema, 'PatientInformation');

module.exports = modelStock;
