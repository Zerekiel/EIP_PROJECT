const mongoose = require('mongoose');

module.exports = {
	unAuth: () => {
		mongoose.connection.on('disconnected', function() {});
		mongoose.connection.close(function() {
		    console.log("\nMongoose default connection is disconnected due to application termination");
		    process.exit(0)
		});
	}
}
