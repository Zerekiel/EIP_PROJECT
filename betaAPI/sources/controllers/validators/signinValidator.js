const eValidator = require('express-validator');
const ctrlEValidatorModel = require('./ctrlEValidatorModel');
const modelSignup = require('../../models/modelSignup');

	const signinIsValid = () => {
	return [
		ctrlEValidatorModel.emailValidator('email'),
		ctrlEValidatorModel.passwordValidator('password'),
		ctrlEValidatorModel.passwordAlreadyRegisteredValidator(modelSignup.modelSignup, 'password'),
		ctrlEValidatorModel.loginValidator(modelSignup.modelSignup, {email: 'email', password: 'password'}),
	];
}

module.exports = {
	signinIsValid
}
