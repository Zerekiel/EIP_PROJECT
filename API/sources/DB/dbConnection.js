const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dotenv = require('dotenv').config();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
var express = require('express');

var app = express();

// Connection URL
const username_db = process.env.USERNAME_DB;
const password_db = process.env.PASSWORD_DB;
const hostlist_db = process.env.HOSTLIST_DB;
const database_db = process.env.DATABASE_DB;
const authSource_db = process.env.AUTHSOURCE_DB;
const url = 'mongodb+srv://' + username_db + ':' + password_db + '@' + hostlist_db + '.mongodb.net/' + database_db + '?authSource=' + authSource_db;

// Use connect method to connect to the Server

// app.use(bodyParser.urlencoded({
//     extended: true
// }));
// app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose.connect(url, { useNewUrlParser: true}, function(err, db) {
	if (err)
		return console.error('Connection failed', err);
	console.log('Connection successful on ', url);
});
var db = mongoose.connection;
var isConnect = function(err, db) {
	console.log("TEST");

	// Added check for DB connection
	if(!db)
	    	console.log("Error connecting db")
	else
		console.log("Db connected successfully")
}
 app.use(isConnect);
// Connect to MongoDB without Mongoose and set connection variable
// MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
//         if (err)
//                 return console.error('Connection failed', err);
//         console.log('Connection successful on ', url);
//   	assert.equal(null, err);
//
//         const client_db = db.db("HealthSafe");
//         // client_db.collection('inventory').insertOne({
//         //   item: "canvas",
//         //   qty: 100,
//         //   tags: ["cotton"],
//         //   size: { h: 28, w: 35.5, uom: "cm" }
//         // })
//         //.then(function(client_db) {
// 		// console.log(client_db);
// 	// client_db.collection('inventory').find({}).toArray(function(err, result) {
// 	// 	if (err)
// 	// 		throw err;
// 	// 	console.log("Result : " + client_db);
// 	// })
// 		console.log("DB name : " + client_db.Db);
//           //console.log(result);
// 	  db.close();
//   	});

module.exports = MongoClient;
module.exports = mongoose;
