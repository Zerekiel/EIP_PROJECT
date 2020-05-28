const eValidator = require('express-validator');
const ctrlEValidatorModel = require('./ctrlEValidatorModel');
const modelPatientData = require('../../models/modelPatientData');

const patientDataIsValid = () => {
	return [
		ctrlEValidatorModel.nameValidator('lastName'),
		ctrlEValidatorModel.nameValidator('firstName'),
		ctrlEValidatorModel.ageValidator('age'),
		ctrlEValidatorModel.genderValidator('gender'),
		ctrlEValidatorModel.heightValidator('height'),
		ctrlEValidatorModel.weightValidator('weight'),
		ctrlEValidatorModel.phoneNumberValidator('emergencyNumber'),
		ctrlEValidatorModel.basicStringdValidator('allergies'),
		ctrlEValidatorModel.basicStringdValidator('medicalHistory'),
		ctrlEValidatorModel.bloodTypeValidator('bloodType'),
		ctrlEValidatorModel.socialNumberValidator(modelPatientData.modelPatientData, 'socialNumber', 'socialNumber'),
		ctrlEValidatorModel.basicStringdValidator('treatments'),
		ctrlEValidatorModel.isBooleanValidator('organDonation'),
		ctrlEValidatorModel.nameValidator('doctor')
	];
}

const patientDataIsValidPUT = () => {
	return [
		ctrlEValidatorModel.nameValidator('lastName'),
		ctrlEValidatorModel.nameValidator('firstName'),
		ctrlEValidatorModel.ageValidator('age'),
		ctrlEValidatorModel.genderValidator('gender'),
		ctrlEValidatorModel.heightValidator('height'),
		ctrlEValidatorModel.weightValidator('weight'),
		ctrlEValidatorModel.phoneNumberValidator('emergencyNumber'),
		ctrlEValidatorModel.basicStringdValidator('allergies'),
		ctrlEValidatorModel.basicStringdValidator('medicalHistory'),
		ctrlEValidatorModel.bloodTypeValidator('bloodType'),
		ctrlEValidatorModel.socialNumberValidatorPUT(modelPatientData.modelPatientData, 'socialNumber', 'socialNumber'),
		ctrlEValidatorModel.basicStringdValidator('treatments'),
		ctrlEValidatorModel.isBooleanValidator('organDonation'),
		ctrlEValidatorModel.nameValidator('doctor')
	];
}

module.exports = {
	patientDataIsValid,
	patientDataIsValidPUT
}
