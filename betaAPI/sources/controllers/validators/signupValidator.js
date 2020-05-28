const eValidator = require('express-validator');
const ctrlEValidatorModel = require('./ctrlEValidatorModel');
const modelSignup = require('../../models/modelSignup');

const signupIsValid = () => {
	return [
		ctrlEValidatorModel.nameValidator('lastName'),
		ctrlEValidatorModel.nameValidator('firstName'),
		ctrlEValidatorModel.ageValidator('age'),
		ctrlEValidatorModel.phoneNumberValidator('phoneNumber'),
		ctrlEValidatorModel.streetNumberValidator('address[0].streetNumber'),
		ctrlEValidatorModel.typeStreetNumberValidator('address[0].typeStreetNumber'),
		ctrlEValidatorModel.streetValidator('address[0].street'),
		ctrlEValidatorModel.zipCodeValidator('address[0].zipCode'),
		ctrlEValidatorModel.cityValidator('address[0].city'),
		ctrlEValidatorModel.countryValidator('address[0].country'),
		ctrlEValidatorModel.emailValidator('email'),
		ctrlEValidatorModel.emailIsAlreadyRegisteredValidator(modelSignup.modelSignup, 'email'),
		ctrlEValidatorModel.passwordValidator('password'),
		ctrlEValidatorModel.confirmationPasswordValidator('confirmationPassword'),
		ctrlEValidatorModel.expertiseDomainValidator('expertiseDomain'),
		ctrlEValidatorModel.idNumberValidator('idNumber'),
		ctrlEValidatorModel.idIsAlreadyRegisteredValidator(modelSignup.modelSignup, 'idNumber', 'idNumber')
	];
}

const signupIdIsValid = () => {
	return ctrlEValidatorModel.idNumberValidator('idNumber');
}

module.exports = {
	signupIsValid,
	signupIdIsValid
}
