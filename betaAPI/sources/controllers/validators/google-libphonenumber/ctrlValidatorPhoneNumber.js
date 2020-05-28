const phoneNumberValidator = require('google-libphonenumber').PhoneNumberUtil.getInstance();

const phoneNumberIsValid = function(value) {
	const number = phoneNumberValidator.parseAndKeepRawInput(value, 'FR');
	const resultIsPossibleNumber  = phoneNumberValidator.isPossibleNumber(number);
	const resultIsValidNumber = phoneNumberValidator.isValidNumber(number);

	if(!resultIsPossibleNumber || !resultIsValidNumber)
		throw new Error("Error phone number invalid");

	return [resultIsPossibleNumber, resultIsValidNumber];
}

module.exports = {
	phoneNumberIsValid
}
