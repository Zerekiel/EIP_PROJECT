var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var url = require('../config/dbCreationAndConnection');
var urlParser = require('url-parse');


class dbCreation
{
	m_resultParseUrl =  new urlParser(url, true);
	m_urlDB = null;
	constructor()
	{
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
};

exports.dbCreation = dbCreation;
// exports.urlDB = urlDB;
