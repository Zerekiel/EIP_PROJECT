const mongoose = require('mongoose');

const stockSchema = mongoose.Schema({
	lastName :
	{
		type : String
	},
	firstName :
	{
		type : String
	},
	age :
	{
		type : String
	},
	gender :
	{
		type : String
	},
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
