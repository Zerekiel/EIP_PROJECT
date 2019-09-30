const mongoose = require('mongoose');

const stockSchema = mongoose.Schema({
	lastName :
	{
		type : String,
		unique : true,
		required : true,
		trim : true
	},
	firstName :
	{
		type : String,
		unique : true,
		required : true,
		trim : true
	},
	age :
	{
		type : String,
		unique : true,
		required : true,
		trim : true
	},
	gender :
	{
		type : String,
		unique : true,
		required : true,
		trim : true
	},
	emergencyNumber :
	{
		type : String,
		unique : true,
		required : true,
		trim : true
	},
	allergies :
	{
		type : String,
		unique : true,
		required : true,
		trim : true
	},
	medicalHistory :
	{
		type : String,
		unique : true,
		required : true,
		trim : true
	},
	bloodType :
	{
		type : String,
		unique : true,
		required : true,
		trim : true
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
		type : String,
		unique : true,
		required : true,
		trim : true
	},
	organDonation :
	{
		type : String,
		unique : true,
		required : true,
		trim : true
	},
	doctor :
	{
		type : String,
		unique : true,
		required : true,
		trim : true
	}
});

var modelStock = mongoose.model('modelStock', stockSchema, true);

module.exports = modelStock;
