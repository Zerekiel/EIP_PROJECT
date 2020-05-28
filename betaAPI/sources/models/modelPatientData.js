const mongoose = require('mongoose');

const patientDataSchema = mongoose.Schema({
	lastName :
	{
		type : String,
		required: true,
		trim : true,
		minLength: 1,
		maxLength: 40
	},
	firstName :
	{
		type : String,
		required: true,
		trim : true,
		uppercase: true,
		minLength: 1,
		maxLength: 40
	},
	age:
	{
		type: Number,
		required: true,
		trim: true,
		min: 0,
		max: 120
	},
	gender:
	{
		type: String,
		required: true,
		enum: ["Male", "Female"],
		trim: true,
		min: 4,
		max: 6
	},
	height:
	{
		type: Number,
		required: true,
		trim: true,
		min: 0,
		max: 300
	},
	weight:
	{
		type: Number,
		required: true,
		trim: true,
		min: 0,
		max: 500
	},
	emergencyNumber:
	{
		type: String,
		required: true,
		trim: true
	},
	allergies :
	{
		type: String,
		trim: true
	},
	medicalHistory:
	{
		type: String,
		trim: true
	},
	bloodType:
	{
		type: String,
		enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
		trim: true,
		minLength: 2,
		maxLength: 3
	},
	socialNumber :
	{
		type : String,
		trim : true,
		required: true,
		unique: true
	},
	treatments :
	{
		type : String,
		trim : true
	},
	organDonation :
	{
		type : Boolean,
		trim : true
		// type : String,
		// trim : true
	},
	doctor :
	{
		type : String,
		trim : true,
		minLength: 1,
		maxLength: 40
	},
	updated:
	{
		type: Date,
		default: Date.now
	}
});

const modelPatientData = mongoose.model('patientData', patientDataSchema, 'patientData');

module.exports = {
	modelPatientData
}
