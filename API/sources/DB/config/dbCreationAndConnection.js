const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dotenv = require('dotenv').config();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
// var urlDB = require('../tools/dbCreation');

// variable for Connection URL
const username_db = process.env.USERNAME_DB;
const password_db = process.env.PASSWORD_DB;
const hostlist_db = process.env.HOSTLIST_DB;
const database_db = process.env.DATABASE_DB;
const authSource_db = process.env.AUTHSOURCE_DB;
// const url = 'mongodb+srv://' + username_db + ':' + password_db + '@' + hostlist_db + '.mongodb.net/' + database_db + '?authSource=' + authSource_db;

const url = 'mongodb://' + username_db + ':' + password_db + '@' + hostlist_db + '.mongodb.net/' + database_db + '?authSource=' + authSource_db;


// Create DB via URL and Connect Mongoose to MongoDB and set connection variable
mongoose.connect(url, { useNewUrlParser: true,
			useCreateIndex: true }, function(err, db) {
	if (err)
		return console.error('Connection failed', err);
	console.log('Connection successful on', url);
	// db.close();
});

	// Disconnect Mongoose and mongoDB
process.on('SIGINT', function(){
	mongoose.connection.on('disconnected', function() {});
	mongoose.connection.close(function(){
	    console.log("\nMongoose default connection is disconnected due to application termination");
	    process.exit(0)
	});
});

module.exports = MongoClient;
module.exports = mongoose;
module.exports = url;
