var MongoClient = require('mongodb').MongoClient;
var urlParser = require('url-parse');
var url = require('../config/dbCreationAndConnection');
sha3_512 = require('js-sha3').sha3_512;
sha3_384 = require('js-sha3').sha3_384;

class dbCRUD {
	m_resultParseUrl;
	m_urlDB;
	constructor() {
		this.m_resultParseUrl = new urlParser(url, true);
		this.m_urlDB = null;
	};

	findUser(dbName, collectionName, json, callback) {
		this.m_resultParseUrl.pathname = dbName;
		this.m_resultParseUrl.set('pathname', dbName);
		this.m_urlDB = this.m_resultParseUrl.href;

		MongoClient.connect(this.m_urlDB, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
			var dbo = db.db(dbName);
			dbo.collection(collectionName).find(json).toArray(function (err, result) //.findOne({}, function(err, result) {
			{
				if (err)
					throw err;
				// db.close();
				return callback(JSON.stringify(result, null, 4));
			});
		});
	}

	// For Read an DB Collection.
	readCollection(dbName, collectionName, callback) {
		this.m_resultParseUrl.pathname = dbName;
		this.m_resultParseUrl.set('pathname', dbName);
		this.m_urlDB = this.m_resultParseUrl.href;

		MongoClient.connect(this.m_urlDB, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
			var dbo = db.db(dbName);
			dbo.collection(collectionName).find({}).toArray(function (err, result) //.findOne({}, function(err, result) {
			{
				if (err)
					throw err;
				// db.close();
				return callback(JSON.stringify(result, null, 4));
			});
		});
	};

	deleteInfo(dbName, collectionName, myQuery, callback) {
		this.m_resultParseUrl.pathname = dbName;
		this.m_resultParseUrl.set('pathname', dbName);
		this.m_urlDB = this.m_resultParseUrl.href;

		MongoClient.connect(this.m_urlDB, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
			if (err)
				throw err;

			var dbo = db.db(dbName);

			dbo.collection(collectionName).deleteOne(myQuery, function (err, result) {
				if (err)
					throw err;

				console.log("1 document deleted");

				// db.close();

				return callback(JSON.stringify(result, null, 4));
			});
		});
	};

	deleteInfoByJson(dbName, collectionName, myJson, callback) {
		this.m_resultParseUrl.pathname = dbName;
		this.m_resultParseUrl.set('pathname', dbName);
		this.m_urlDB = this.m_resultParseUrl.href;
		MongoClient.connect(this.m_urlDB, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
			if (err)
				throw err;

			var dbo = db.db(dbName);

			dbo.collection(collectionName).findOneAndDelete(myJson, function (err, result) {
				if (err)
					throw err;

				console.log("1 document deleted : ", result.value);
				// db.close();
				return callback(result);
			});
		});
	};

	updateOneInfo(dbName, collectionName, myQuery, dataToChange, callback) {
		this.m_resultParseUrl.pathname = dbName;
		this.m_resultParseUrl.set('pathname', dbName);
		this.m_urlDB = this.m_resultParseUrl.href;
		var option = { returnOriginal: false };
		MongoClient.connect(this.m_urlDB, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
			if (err)
				throw err;
			var dbo = db.db(dbName);
			dbo.collection(collectionName).findOneAndUpdate(myQuery, dataToChange, option, function (err, result) {
				if (err) {
					console.log("ERROR : ", err);
				}
				else {
					return callback(result);
				}
			});
			//db.close();
		});
	}


	/*
    ** To Delete a DB Collection
    ** dbo.id => ID in database
    */

	// deleteCollection(dbName, collectionName, callback)
	// {
	//     this.m_resultParseUrl.pathname = dbName;
	// this.m_resultParseUrl.set('pathname', dbName);
	// this.m_urlDB = this.m_resultParseUrl.href;
	//
	// MongoClient.connect(this.m_urlDB, { useNewUrlParser : true }, function(err, db)
	//     {
	//         var dbo = db.db(dbName);
	//         console.log(dbo.id);
	//         dbo.collection(collectionName).deleteData(dbo.id, 1, function(err, result)
	//             {
	//                 if (err)
	//                     throw err;
	//                 db.close();
	//             });
	//
	//     });
	// };

    /*
    ** To Update a DB Collection
    */

	updateCollection(dbName, collectionName, myQuery, newValues, callback) {
		this.m_resultParseUrl.pathname = dbName;
		this.m_resultParseUrl.set('pathname', dbName);
		this.m_urlDB = this.m_resultParseUrl.href;

		MongoClient.connect(this.m_urlDB, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
			var dbo = db.db(dbName);
			dbo.collection(collectionName).findOneAndUpdate(myQuery, newValues, function (err, result) {
				if (err) {
					console.log("Error :", err);
					return callback(false, err);
				} else {
					return callback(result);
				}
			});
			//db.close();
		});
	};



	findByCredentials(dbName, collectionName, username, password) {
		this.m_resultParseUrl.pathname = dbName;
		this.m_resultParseUrl.set('pathname', dbName);
		this.m_urlDB = this.m_resultParseUrl.href;
		MongoClient.connect(this.m_urlDB, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, db) {
			var dbo = db.db(dbName);
			var user = await dbo.collection(collectionName).findOne({ userName: username })
			if (!user) {
				throw new Error({ error: 'Invalid login credentials' })
			}

			// const isPasswordMatch =  await bcrypt.compare(password, user.password)
			const isPasswordMatch = (sha3_512(sha3_384(password)) === user.password)
			if (!isPasswordMatch) {
				throw new Error({ error: 'Invalid login credentials' })
			}
		});
		return true
	}
};

exports.dbCRUD = dbCRUD;
