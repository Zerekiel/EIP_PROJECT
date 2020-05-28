const eValidator = require('express-validator');

const eValidatorErrorHandler = function(req) {
	const errors = eValidator.validationResult(req);

	if (!errors.isEmpty())
		return errors;

	return errors;
}

module.exports = {
	eValidatorErrorHandler
}
