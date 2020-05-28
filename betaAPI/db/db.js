const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const configDb = require('./config/configDb');
const dbUnauth = require('./controllers/dbUnauth');

// MongoClient.connect(configDb.url_db, { useUnifiedTopology: true, useNewUrlParser: true },
// 	 function(err, db) {
// 		 if (err)
// 		 	throw err;
//
// 		console.log(`Connected to MongoDB! ${configDb.url_db}`);
// 		//db.close();
// });

mongoose.connect(configDb.url_db, { useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true }, function(err, db) {
	if (err)
		return console.error('Connection failed', err);
	console.log('Connection successful on', configDb.url_db);
	// db.close();
});

// process.on('unhandledRejection', up => { throw up });
process.on('SIGINT', dbUnauth.unAuth);
process.on('SIGTERM', dbUnauth.unAuth);

module.exports = MongoClient;
