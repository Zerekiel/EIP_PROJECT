var MongoClient = require('mongodb').MongoClient;
var urlParser = require('url-parse');
var url = require('../config/dbCreationAndConnection');

class dbCRUD
{
	m_resultParseUrl;
	m_urlDB;

	constructor()
	{
		this.m_resultParseUrl =  new urlParser(url, true);
		this.m_urlDB = null;
	};

	// For Read an DB Collection.
	readCollection(dbName, collectionName, callback)
	{
		this.m_resultParseUrl.pathname = dbName;
		this.m_resultParseUrl.set('pathname', dbName);
		this.m_urlDB = this.m_resultParseUrl.href;

		MongoClient.connect(this.m_urlDB, { useNewUrlParser: true }, function(err, db)
		{
			var dbo = db.db(dbName);
			dbo.collection(collectionName).find({}).toArray(function(err, result) //.findOne({}, function(err, result) {
			{
				if (err)
					throw err;
				db.close();
				return callback(JSON.stringify(result, null, 4));
			});
		});
	};

	deleteInfo(dbName, collectionName, myQuery, callback)
	{
		this.m_resultParseUrl.pathname = dbName;
		this.m_resultParseUrl.set('pathname', dbName);
		this.m_urlDB = this.m_resultParseUrl.href;
		MongoClient.connect(this.m_urlDB, { useNewUrlParser: true }, function(err, db) {
			if (err) throw err;
			var dbo = db.db(dbName);
			//var myquery = { userName: "TEST0" };
			dbo.collection(collectionName).deleteOne(myQuery, function(err, obj) {
				if (err) throw err;
			//console.log(obj);
			console.log("1 document deleted");
			db.close();
			});
		});
	};
};

exports.dbCRUD = dbCRUD;
