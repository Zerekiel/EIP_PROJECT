var MongoClient = require('mongodb').MongoClient;
var urlParser = require('url-parse');
var url = require('../config/dbCreationAndConnection');


class dbCreation
{
	m_resultParseUrl;
	m_urlDB;

	constructor()
	{
		this.m_resultParseUrl =  new urlParser(url, true);
		this.m_urlDB = null;
	};

	// For Create an DataBase you need call (with callback ?) a method for create an collection.
	createDB(dbName, callback)
	{
		this.m_resultParseUrl.pathname = dbName;
		this.m_resultParseUrl.set('pathname', dbName);
		this.m_urlDB = this.m_resultParseUrl.href;

		MongoClient.connect(this.m_urlDB, { useNewUrlParser: true }, function(err, db)
		{
			if (err)
				throw err;

			var dbo = null;
			dbo = db.db(dbName);
			dbo.admin().listDatabases().then(function(listDatabase){
				//console.log(listDatabase);
				db.close();
				return callback(listDatabase);
			});
		});
	};

	// Create an collection in DB
	createColl(dbName, nameColl, callback)
	{
		this.m_resultParseUrl.pathname = dbName;
		this.m_resultParseUrl.set('pathname', dbName);
		this.m_urlDB = this.m_resultParseUrl.href;

		MongoClient.connect(this.m_urlDB, { useNewUrlParser: true }, function(err, db) {
			var dbo = null;

			dbo = db.db(dbName);
			dbo.createCollection(nameColl, function(err)
			{
				if (err)
					throw err;

				//console.log("Collection created! Name Collection = " + nameColl);
				return callback(nameColl);
				db.close();

			});
		});
	};

	// List all DB existing.
	displayDatabases(dbName, callback)
	{
		MongoClient.connect(this.m_urlDB, { useNewUrlParser: true }, function(err, db)
		{
			if (err)
				throw err;

			var dbo = null;
			dbo = db.db(dbName);
			dbo.admin().listDatabases().then(function(listDatabase){
				db.close();
				return callback(listDatabase);
			});
		});
	}

	// List all collection existing in the DB.
	displayAllCollections(dbName)
	{
		MongoClient.connect(this.m_urlDB, { useNewUrlParser: true }, function(err, db)
		{
			var dbo = null;
			dbo = db.db(dbName);
			dbo.listCollections().toArray(function(err, collInfos) {
				console.log("TEST");
				console.log(collInfos);
				db.close();
			});
		});
	}
};

exports.dbCreation = dbCreation;
