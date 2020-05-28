const alreadyExist = (model, key, value) => {
	// if(value) {
		return new Promise((resolve, reject) => {
			model.findOne({ [key]: value })
			.then((result) => {
				if (result) {
					return reject(new Error(`Error : The value ${value} already exists. Please enter another value.`));
				}
				else {
					return resolve(value);
				}
			}).catch(err => {
				if (err)
					return reject(err);
			})
		})
	// }
	// else
	// 	return new Error("Error : value is null");
};


const login = (model, value) => {
		const resultPassword = new Promise((resolve, reject) => {
				// console.log(value);

			model.findOne({email: value})
			.then((result) => {
				// console.log("RESULT "+result);
				// if (req.body.password === result.password) {
				// 	console.log("OKKKKK");
				// }
				if (result) {
					return resolve(result);
				}
				else {
					return reject(new Error('Email not found.'));
				}
			}).catch(err => {
				if (err)
					return reject(err);
			})
		})

	return resultPassword;
};

const passwordAlreadyExist = (model, value) => {
	console.log(value)
	if(value) {
		return new Promise((resolve, reject) => {
			model.findOne({ confirmationPassword: value })
			.then((result) => {
				console.log(result)
				if (result) {
					return resolve(result);
				}
				else {
					return reject(new Error('Invalid password or not found.'));
				}
			}).catch(err => {
				if (err)
					return reject(err.stack);
			})
		})
	}
	else
		return new Error("Password not find.");
};

const sameAccount =  (model, body) => {
	console.log(`BODY = ${body.email}`)
		return new Promise((resolve, reject) => {
			model.findOne({email: body.email})
			.then((result) => {
				if (result) {
					console.log("OK "+result)
					return resolve(result);
				}
				else {
					console.log("ERR "+result)
					return reject(new Error('Invalid Account.'));
				}
			}).catch(err => {
				if (err)
					return reject(err.stack);
			})
		})

};

module.exports = {
	alreadyExist,
	login,
	passwordAlreadyExist,
	sameAccount
}
