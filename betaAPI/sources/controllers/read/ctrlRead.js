const mongodb = require('mongodb');

const displayAllSignup = (model) => {
	return model.find({})
		.then(result => {
			console.log(result);
			return result;
		})
		.catch(err => {
			console.error(err);
			return err;
		})
}

const findAllData = (model) => {
	if (model) {
		return new Promise((resolve, reject) => {
			model.find({})
			.then((result) => {
				if (result) {
					return resolve(result);
				}
				else {
					return reject(new Error('Data not found.').stack);
				}
			}).catch(err => {
				if (err)
					return reject(err.stack);
			})
		})
	}
	else
		return new Error("JSON model not found.").stack;
}

const findUserByID = (model, jsonID) => {
	var myQuery = { _id: new mongodb.ObjectId(jsonID) };

	return model.findOne(myQuery)
		.then(result => {
			// console.log(result); //debug
			return result;
		})
		.catch(err => {
			console.error(err);
			return err;
		})
}

module.exports = {
	displayAllSignup,
	findUserByID,
	findAllData
}
