const mongodb = require('mongodb');
const ctrlRead = require('../read/ctrlRead');

// const updateValueById = (model, jsonId, newData) => {
// 	var myQuery = { _id: new mongodb.ObjectId(jsonId) };
// 	const dataToChange = {$set: newData};
//
// 	return model.updateOne(myQuery, dataToChange)
// 		.then(result => {
// 			console.log(result);
// 			if (result.n === 0) {
// 				console.log(result.n);
// 				return new Error(JSON.stringify("ID invalid or not found"));
// 			}
// 			else if (result.nModified === 0) {
// 				console.log(result.nModified);
// 				console.log("OK")
// 				return new Error(JSON.stringify({Error: "ID invalid or not found2"}))
// 			}
// 			else {
// 				console.log(result);
// 				return JSON.stringify(result);
// 			}
// 		})
// 		.catch(err => {
// 			console.error(err);
// 			return err;
// 		})
// }

const updateValueById = (model, jsonId, newData) => {
	var myQuery = { _id: new mongodb.ObjectId(jsonId) };
	const dataToChange = {$set: newData};
	// console.log(dataToChange)
	if(jsonId && newData) {
		return new Promise((resolve, reject) => {
			model.updateOne(myQuery, dataToChange)
			.then((result) => {
				if (result.n === 0) {

					console.log(result.n);
					return reject(new Error(`Error : ID INVALID  OR NOT FOUNDED`));
				}
				// else if (result.nModified === 0) {
				// 	console.log(result.nModified);
				// 	return reject(new Error(`Error : NOT UPDATED`));
				//
				// }
				else {

					const result2 = ctrlRead.findUserByID(model, jsonId);
					//console.log(result);

					return resolve(result2);
				}
			}).catch(err => {



				if (err)
					return reject(err.stack);
			})
		})
	}
	else {
			throw new Error("Error : ID is null");
	}
};

module.exports = {
	updateValueById,
	// updateValueById2
}
