const emailAlreadyExist = (model, value) => {
	if(value) {
		return new Promise((resolve, reject) => {
			model.findOne({ email: value })
			.then((result) => {
				if (result) {
					return reject(new Error('Error : This email already exists. Please enter another email.'));
				}
				else {
					return resolve(value);
				}
			}).catch(err => {
				if (err)
					return reject(err);
			})
		})
	}
	else
		return new Error("Error : Email value is null");
};

module.exports = {
	emailAlreadyExist
}
