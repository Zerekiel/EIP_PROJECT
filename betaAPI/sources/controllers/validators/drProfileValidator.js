const eValidator = require('express-validator');
const ctrlEValidatorModel = require('./ctrlEValidatorModel');
const modelDrProfile = require('../../models/modelDrProfile');

const drProfileIsValid = () => {
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
		ctrlEValidatorModel.emailIsAlreadyRegisteredValidator(modelDrProfile.modelDrProfile, 'email'),
		ctrlEValidatorModel.passwordValidator('password'),
		ctrlEValidatorModel.confirmationPasswordValidator('confirmationPassword'),
		ctrlEValidatorModel.expertiseDomainValidator('expertiseDomain'),
		ctrlEValidatorModel.idNumberValidator('idNumber'),
		ctrlEValidatorModel.idIsAlreadyRegisteredValidator(modelDrProfile.modelDrProfile, 'idNumber', 'idNumber')
	];
}

const drProfileIsValidPUT = () => {
	return [
		ctrlEValidatorModel.nameValidatorPUT('lastName'),
		ctrlEValidatorModel.nameValidatorPUT('firstName'),
		ctrlEValidatorModel.ageValidatorPUT('age'),
		ctrlEValidatorModel.phoneNumberValidatorPUT('phoneNumber'),
		ctrlEValidatorModel.streetNumberValidatorPUT('address[0].streetNumber'),
		ctrlEValidatorModel.typeStreetNumberValidatorPUT('address[0].typeStreetNumber'),
		ctrlEValidatorModel.streetValidatorPUT('address[0].street'),
		ctrlEValidatorModel.zipCodeValidatorPUT('address[0].zipCode'),
		ctrlEValidatorModel.cityValidatorPUT('address[0].city'),
		ctrlEValidatorModel.countryValidatorPUT('address[0].country'),
		ctrlEValidatorModel.emailValidatorPUT('email'),
		ctrlEValidatorModel.emailIsAlreadyRegisteredValidatorPUT(modelDrProfile.modelDrProfile, 'email'),
		ctrlEValidatorModel.passwordValidatorPUT('password'),
		ctrlEValidatorModel.confirmationPasswordValidatorPUT('confirmationPassword'),
		ctrlEValidatorModel.expertiseDomainValidatorPUT('expertiseDomain'),
		ctrlEValidatorModel.idNumberValidatorPUT('idNumber'),
		// ctrlEValidatorModel.idIsAlreadyRegisteredValidatorPUT(modelDrProfile.modelDrProfile, 'idNumber', 'idNumber') //TODO a modifier
	];
}

module.exports = {
	drProfileIsValid,
	drProfileIsValidPUT
}
