const mongodb = require('mongodb');

const findUserAndDelete = (model, jsonId) => {
	const myQuery = { _id: new mongodb.ObjectId(jsonId) };
	// console.log(myQuery)

	return model.findOneAndDelete(myQuery)
		.then(result => {
			console.log(result);
			return result;
		})
		.catch(err => {
			console.error(err.stack);
			return err;
		})
}

module.exports = {
	findUserAndDelete
}
