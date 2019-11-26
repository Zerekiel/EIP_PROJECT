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

	findUser(dbName, collectionName, json, callback)
	{
		this.m_resultParseUrl.pathname = dbName;
		this.m_resultParseUrl.set('pathname', dbName);
		this.m_urlDB = this.m_resultParseUrl.href;

		MongoClient.connect(this.m_urlDB, { useNewUrlParser: true, useUnifiedTopology: true  }, function(err, db)
		{
			var dbo = db.db(dbName);
			dbo.collection(collectionName).find(json).toArray(function(err, result) //.findOne({}, function(err, result) {
			{
				if (err)
					throw err;
				db.close();
				return callback(JSON.stringify(result, null, 4));
			});
		});
	}

	// For Read an DB Collection.
	readCollection(dbName, collectionName, callback)
	{
		this.m_resultParseUrl.pathname = dbName;
		this.m_resultParseUrl.set('pathname', dbName);
		this.m_urlDB = this.m_resultParseUrl.href;

		MongoClient.connect(this.m_urlDB, { useNewUrlParser: true, useUnifiedTopology: true  }, function(err, db)
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

	updateOneInfo(dbName, collectionName, myQuery, dataToChange, callback)
	{
		this.m_resultParseUrl.pathname = dbName;
		this.m_resultParseUrl.set('pathname', dbName);
		this.m_urlDB = this.m_resultParseUrl.href;
		var option = {returnOriginal: false};
		MongoClient.connect(this.m_urlDB, { useNewUrlParser: true }, function(err, db) {
			if (err)
			 	throw err;

			var dbo = db.db(dbName);
			dbo.collection(collectionName).findOneAndUpdate(myQuery, dataToChange, option, function(err, result) {
				if (err)
				{
					console.log("ERROR : ", err);
				}
				else
				{
					return callback(result);
				}
			});
			db.close();
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

    updateCollection(dbName, collectionName, myQuery, newValues,callback)
    {
        this.m_resultParseUrl.pathname = dbName;
		this.m_resultParseUrl.set('pathname', dbName);
		this.m_urlDB = this.m_resultParseUrl.href;

		//var newValues = { $set: {name: "Mickey", address: "Canyon 123" } };

        MongoClient.connect(this.m_urlDB, { userNewUrlParser: true }, function(err, db)
        {
            var dbo = db.db(dbName);
            dbo.collection(collectionName).updateOne(myQuery, newValues, function(err, result) {
                if (err)
                    throw err;
                db.close();
            });
        });
    };
};

exports.dbCRUD = dbCRUD;
