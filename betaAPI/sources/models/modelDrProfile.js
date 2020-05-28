const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const drProfileSchema = mongoose.Schema({
	lastName ://
	{
		type : String,
		// required: true,
		trim : true,
		minLength: 1,
		maxLength: 40,
	},
	firstName :
	{
		type : String,
		// required: true,
		trim : true,
		uppercase: true,
		minLength: 1,
		maxLength: 40
	},
	age:
	{
		type: Number,
		// required: true,
		trim: true,
		min: 18,
		max: 120
	},
	phoneNumber:
	{
		type: String,
		// required: true,
		trim: true
		// validate: function(value) {
		// 	console.log(this)
		// 	const number = phoneNumberValidator.parseAndKeepRawInput(value, 'FR');
		// 	throw new Error("TEST");
		// 	return [console.log(phoneNumberValidator.isPossibleNumber(number)),
		// 	console.log(phoneNumberValidator.isValidNumber(number))]
		// }
		// match: /^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$/
	},
	address :
	[{
		_id : false,
		streetNumber: {
			type: Number,
			// required: true,
			trim: true,
			min: 0
		},
		typeStreetNumber: {
			type: String,
			enum: ['', "bis", "ter"],
			lowercase: true,
			trim: true,
			minLength: 0,
			maxLength: 3
		},
		typeStreet: {
			type: String,
			enum: ["rue", "avenue", "boulevard", "chemin"],
			lowercase: true,
			trim: true,
			// required: true
		},
		street: {
			type: String,
			// required: true,
			trim: true
		},
		zipCode: {
			type: Number,
			// required: true,
			trim: true,
			min: 00001,
			max: 99999
		},
		city: {
			type: String,
			// required: true,
			trim: true,
			uppercase: true
		},
		country: {
			type: String,
			// required: true,
			trim: true,
			uppercase: true
		}
	}],
	email :
	{
		type: String,
		// required: true,
		trim: true,
		// // unique: true,
		lowercase: true
	},
	password:
	{
		type: String,
		// required: true,
		trim: true,
		minLength: 7,
		maxLength: 20
	},
	confirmationPassword:
	{
		type: String,
		// required: true,
		trim: true
	},
	expertiseDomain :
	{
		type : String,
		trim : true,
		uppercase: true
	},
	idNumber : //chiffre ?
	{
		type: String,
		trim: true,
		// required: true,
		// unique: true
	},
	updated:
	{
		type: Date,
		default: Date.now
	}
});

drProfileSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next()
})
const modelDrProfile = mongoose.model('drProfile', drProfileSchema, 'drProfile');

module.exports = {
	modelDrProfile
}
