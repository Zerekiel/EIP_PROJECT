const ctrlVPhoneNumber = require('./google-libphonenumber/ctrlValidatorPhoneNumber');
const eValidator = require('express-validator');
const modelSignup = require('../../models/modelSignup');
const ctrlEmailTools = require('../tools/ctrlEmailTools');
const ctrlTools = require('../tools/ctrlTools');


const nameValidator = (jsonValue) => {
	const regexp = /^(?=.{1,40}$)[a-zA-Z]+(?:[-,.'\s][a-zA-Z]+)*$/i;

	return eValidator.check(jsonValue)
		.exists().withMessage("Error -> Doesn't exist")
		.not().isEmpty().withMessage("Error -> is empty")
		.isLength({min: 1, max: 40}).withMessage("Error -> lenght min 1, max 40")
		.matches(regexp).withMessage("Error -> Doesn't matches(regex)");
};


const nameValidatorPUT = (jsonValue) => {
	const regexp = /^(?=.{0,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/i;

	return eValidator.check(jsonValue)
		.isLength({min: 0, max: 40}).withMessage("Error -> lenght min 1, max 40")
		.matches(regexp).withMessage("Error -> Doesn't matches(regex)");
};

const ageValidator = (jsonValue) => {
	return eValidator.check(jsonValue)
		.exists().withMessage("Error -> Doesn't exists")
		.not().isEmpty().withMessage("Error -> is empty")
		.isNumeric({no_symbols: true}).withMessage("Error -> isn't Numeric value");
};

const ageValidatorPUT = (jsonValue) => {
	return eValidator.check(jsonValue)
		.isNumeric({no_symbols: true}).withMessage("Error -> isn't Numeric value");
};

const phoneNumberValidator = (jsonValue) => {
	return eValidator.check(jsonValue)
		.exists().withMessage("Error -> Doesn't exist")
		.not().isEmpty().withMessage("Error -> is Empty")
		.isNumeric({no_symbols: false}).withMessage("Error -> isn't Numeric value")
		.custom(value => ctrlVPhoneNumber.phoneNumberIsValid(value))
			.withMessage("Error -> phonenumber invalid");
};

const phoneNumberValidatorPUT = (jsonValue) => {
	return eValidator.check(jsonValue)
		.isNumeric({no_symbols: false}).withMessage("Error -> isn't Numeric value")
		.custom(value => ctrlVPhoneNumber.phoneNumberIsValid(value))
			.withMessage("Error -> phonenumber invalid");
};

const streetNumberValidator = (jsonValue) => {
	return eValidator.check(jsonValue)
		.exists().withMessage("Error -> Doesn't exists")
		.not().isEmpty().withMessage("Error -> is Empty")
		.isNumeric({no_symbols: true}).withMessage("Error -> isn't Numeric value");
};

const streetNumberValidatorPUT = (jsonValue) => {
	return eValidator.check(jsonValue)
		.isNumeric({no_symbols: true}).withMessage("Error -> isn't Numeric value");
};

const typeStreetNumberValidator = (jsonValue) => {
	const regexp = /^$|bis|ter|quater/;

	return eValidator.check(jsonValue)
		.exists().withMessage("Error -> Doesn't exists")
		.matches(regexp).withMessage("Error -> doesn't matches(regex)");
};

const typeStreetNumberValidatorPUT = (jsonValue) => {
	const regexp = /^$|bis|ter/;

	return eValidator.check(jsonValue)
		.matches(regexp).withMessage("Error -> doesn't matches(regex)");
};

const typeStreetValidator = (jsonValue) => {
	const regexp = 	/rue|avenue|boulevard|chemin|quai/;

	return 	eValidator.check(jsonValue)
		.exists().withMessage("Error -> Doesn't exists")
		.not().isEmpty().withMessage("Error -> is Empty")
		.isAlpha().withMessage("Error -> isn't Alphabetic value")
		.matches(regexp).withMessage("Error -> Doesn't matches(regex)");
};

const typeStreetValidatorPUT = (jsonValue) => {
	const regexp = 	/rue|avenue|boulevard|chemin/;

	return 	eValidator.check(jsonValue)
		.matches(regexp).withMessage("Error -> Doesn't matches(regex)");
};

const streetValidator = (jsonValue) => {
	const regexp = /^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/i;

	return 	eValidator.check(jsonValue)
		.exists().withMessage("Error -> Doesn't exists")
		.not().isEmpty().withMessage("Error -> is Empty")
		.matches(regexp).withMessage("Error -> Doesn't matches(regex)");
};

const streetValidatorPUT = (jsonValue) => {
	const regexp = /^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/i;

	return 	eValidator.check(jsonValue)
		.matches(regexp).withMessage("Error -> Doesn't matches(regex)");
};

const zipCodeValidator = (jsonValue) => {
	return 	eValidator.check(jsonValue)
		.exists().withMessage("Error -> Doesn't exists")
		.not().isEmpty().withMessage("Error -> is Empty")
		.isNumeric({no_symbols: true}).withMessage("Error -> isn't Numeric value");
};

const zipCodeValidatorPUT = (jsonValue) => {
	return 	eValidator.check(jsonValue)
		.isNumeric({no_symbols: true}).withMessage("Error -> isn't Numeric value");
};

const cityValidator = (jsonValue) => {
	const regexp = /^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/i;

	return 	eValidator.check(jsonValue)
		.exists().withMessage("Error -> Doesn't exist")
		.not().isEmpty().withMessage("Error -> is Empty")
		.matches(regexp).withMessage("Error -> Doesn't matches(regex)");
};

const cityValidatorPUT = (jsonValue) => {
	const regexp = /^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/i;

	return 	eValidator.check(jsonValue)
		.matches(regexp).withMessage("Error -> Doesn't matches(regex)");
};

const countryValidator = (jsonValue) => {
	const regexp = /^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/i;

	return 	eValidator.check(jsonValue)
		.exists().withMessage("Error -> Doesn't exists")
		.not().isEmpty().withMessage("Error -> is Empty")
		.matches(regexp).withMessage("Error -> Doesn't matches(regex)");
};

const countryValidatorPUT = (jsonValue) => {
	const regexp = /^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/i;

	return 	eValidator.check(jsonValue)
		.matches(regexp).withMessage("Error -> Doesn't matches(regex)");
};

const emailValidator = (jsonValue) => {
	return 	eValidator.check('email')
		.exists().withMessage("Error -> Doesn't exists")
		.not().isEmpty().withMessage("Error -> is Empty")
		.isEmail().withMessage("Error -> invalid email")
};

const emailValidatorPUT = (jsonValue) => {
	return 	eValidator.check('email')
		// .isEmail().withMessage("Error -> invalid email")
};

const passwordAlreadyRegisteredValidator = (model, jsonValue) => {
	return eValidator.check(jsonValue)
		.exists().withMessage("Error -> Doesn't exist")
		.not().isEmpty().withMessage("Error -> is Empty")
		.custom(value => ctrlTools.passwordAlreadyExist(model, value))
			.withMessage("Error -> Password already exists");
};

const passwordValidator = (jsonValue) => {
	const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!-_@#\$%\^&\*])(?=.{7,20})/;

	return 	eValidator.check(jsonValue)
		.exists().withMessage("Error -> Doesn't exists")
		.not().isEmpty().withMessage("Error -> is Empty")
		.isLength({ min: 7, max: 20 }).withMessage("Error -> length invalid. min 7, max 20 chars")
		.matches(regexp).withMessage("Error -> Doesn't matches(regex)");

};

const passwordValidatorPUT = (jsonValue) => {
	const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!-_@#\$%\^&\*])(?=.{0,20})/;

	return 	eValidator.check(jsonValue)
		.matches(regexp).withMessage("Error -> Doesn't matches(regex)");
};

const confirmationPasswordValidator = (jsonValue) => {
	return 	eValidator.check(jsonValue)
		.exists().withMessage("Error -> Doesnt' exists")
		.not().isEmpty().withMessage("Error -> is Empty")
		.custom((value , { req }) => {
			if (value !== req.body.password)
				throw new Error('Password confirmation is incorrect');

			return true;
		})
};

const confirmationPasswordValidatorPUT = (jsonValue) => {
	return 	eValidator.check(jsonValue)
		// .exists().withMessage("Error -> Doesnt' exists")
		// .not().isEmpty().withMessage("Error -> is Empty")
		.custom((value , { req }) => {
			if (req.body.password) {
				if (value !== req.body.password)
					throw new Error('Password confirmation is incorrect');
			}

			return true;
		})
};

const expertiseDomainValidator = (jsonValue) => {
	return 	eValidator.check(jsonValue)
		.exists().withMessage("Error -> Doesn't exists")
		.not().isEmpty().withMessage("Error -> is Empty")
};

const expertiseDomainValidatorPUT = (jsonValue) => {
	return 	eValidator.check(jsonValue);
};

const idNumberValidator = (jsonValue) => { // Todo check unique DB + string or number ? +
	return 	eValidator.check(jsonValue)
		.exists().withMessage("Error -> Doesn't exists")
		.not().isEmpty().withMessage("Error -> is Empty")
};

const idNumberValidatorPUT = (jsonValue) => { // Todo check unique DB + string or number ? +
	return 	eValidator.check(jsonValue);
};

const emailIsAlreadyRegisteredValidator = (model, jsonValue) => {
	return eValidator.check(jsonValue)
		.exists().withMessage("Error -> Doesn't exist")
		.not().isEmpty().withMessage("Error -> is Empty")
		.custom(value => ctrlEmailTools.emailAlreadyExist(model, value))
			.withMessage("Error -> Email already exists");
};

const emailIsAlreadyRegisteredValidatorPUT = (model, jsonValue) => {
	return eValidator.check(jsonValue)
		.custom((value , { req }) => {
			if (req.body.email) {
				ctrlEmailTools.emailAlreadyExist(model, value);
			}

			return true;
		})
		.withMessage("Error -> Email already exists");
};

const idIsAlreadyRegisteredValidator = (model, key, jsonValue) => {
	return eValidator.check(jsonValue)
		.exists().withMessage("Error -> Doesn't exist")
		.not().isEmpty().withMessage("Error -> is Empty")
		.custom(value => ctrlTools.alreadyExist(model, key, value))
			.withMessage("Error -> value already exists");
};

// const idIsAlreadyRegisteredValidatorPUT = (model, key, jsonValue) => {
//
// 	return eValidator.check(jsonValue)
// 	.custom(value => {
//
// 			// console.log("VALUE : "+value);
// 			if (value) {
// 				ctrlTools.alreadyExist(model, key, value);
// 			}
// 			return false;
// 		})
// 		// .not().isEmpty().withMessage("Error -> is Empty")
//
// };

const genderValidator = (jsonValue) => {
	const regexp = /^$|Male|Female/;

	return eValidator.check(jsonValue)
		.exists().withMessage("Error -> Doesn't exists")
		.matches(regexp).withMessage("Error -> doesn't matches(regex)");
};

const heightValidator = (jsonValue) => {
	return eValidator.check(jsonValue)
		.exists().withMessage("Error -> Doesn't exists")
		.not().isEmpty().withMessage("Error -> is empty")
		.isNumeric({no_symbols: true}).withMessage("Error -> isn't Numeric value");
};

const weightValidator = (jsonValue) => {
	return eValidator.check(jsonValue)
		.exists().withMessage("Error -> Doesn't exists")
		.not().isEmpty().withMessage("Error -> is empty")
		.isNumeric({no_symbols: true}).withMessage("Error -> isn't Numeric value");
};

const socialNumberValidator = (model, key, jsonValue) => { // Todo check unique DB + string or number ? +
	return 	eValidator.check(jsonValue)
		.exists().withMessage("Error -> Doesn't exists")
		.not().isEmpty().withMessage("Error -> is Empty")
		.custom(value => ctrlTools.alreadyExist(model, key, value))
			.withMessage("Error -> value already exists");
};

const socialNumberValidatorPUT = (model, key, jsonValue) => { // Todo check unique DB + string or number ? +
	return 	eValidator.check(jsonValue)
		.exists().withMessage("Error -> Doesn't exists")
		.not().isEmpty().withMessage("Error -> is Empty")
};

const basicStringdValidator = (jsonValue) => {
	return 	eValidator.check(jsonValue)
		.exists().withMessage("Error -> Doesn't exists")
		.not().isEmpty().withMessage("Error -> is Empty")
		.stripLow({ keep_new_lines: true }).withMessage("Error -> Format string or character is invalid.")

};

const isBooleanValidator = (jsonValue) => {
	return 	eValidator.check(jsonValue)
		.exists().withMessage("Error -> Doesn't exists")
		.not().isEmpty().withMessage("Error -> is Empty")
		.isBoolean().withMessage("Error -> is not a boolean.")

};

const bloodTypeValidator = (jsonValue) => {
	const regexp = 	/A+|A-|B+|B-|AB+|AB-|O+|O-/;

	return 	eValidator.check(jsonValue)
		.exists().withMessage("Error -> Doesn't exists")
		.not().isEmpty().withMessage("Error -> is Empty")
		.isLength({ min: 2, max: 3 }).withMessage("Error -> length invalid. min 2, max 3 characters")
		.matches(regexp).withMessage("Error -> Doesn't matches(regex)");
};

const loginValidator = (model, jsonValue) => {
	const result =  eValidator.check(jsonValue.email, jsonValue.password)
		.exists().withMessage("Error -> Doesn't exist")
		.not().isEmpty().withMessage("Error -> is Empty")
		.custom((value) => ctrlTools.login(model, value),
			(value2) => ctrlTools.passwordAlreadyExist(model, value2))

	return result;

};

module.exports = {
	nameValidator,
	nameValidatorPUT,
	ageValidator,
	ageValidatorPUT,
	phoneNumberValidator,
	phoneNumberValidatorPUT,
	streetNumberValidator,
	streetNumberValidatorPUT,
	typeStreetNumberValidator,
	typeStreetNumberValidatorPUT,
	typeStreetValidator,
	typeStreetValidatorPUT,
	streetValidator,
	streetValidatorPUT,
	zipCodeValidator,
	zipCodeValidatorPUT,
	cityValidator,
	cityValidatorPUT,
	countryValidator,
	countryValidatorPUT,
	emailValidator,
	emailValidatorPUT,
	passwordValidator,
	passwordValidatorPUT,
	confirmationPasswordValidator,
	confirmationPasswordValidatorPUT,
	expertiseDomainValidator,
	expertiseDomainValidatorPUT,
	idNumberValidator,
	idNumberValidatorPUT,
	emailIsAlreadyRegisteredValidator,
	emailIsAlreadyRegisteredValidatorPUT,
	passwordAlreadyRegisteredValidator,
	idIsAlreadyRegisteredValidator,
	genderValidator,
	heightValidator,
	weightValidator,
	socialNumberValidator,
	socialNumberValidatorPUT,
	basicStringdValidator,
	isBooleanValidator,
	bloodTypeValidator,
	loginValidator
}
