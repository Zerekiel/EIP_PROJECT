const fs = require('fs');

module.exports = {
	optionHTTPS: {
		key: fs.readFileSync('bin/config/certificats/localhost.key'),
		cert: fs.readFileSync('bin/config/certificats/localhost.crt'),
		requestCert: false,
		rejectUnauthorized: false
	},

	displayURL: (req, res) => {

		const host = req.headers.host;
		const baseUrl = req.url;
		const isEncrypt = (req.connection.encrypted ? 'https': 'http');
		const realUrl = `${isEncrypt}://${host}${baseUrl}`;

		console.log(`URL : ${realUrl}`);

		return realUrl;
	}

};
