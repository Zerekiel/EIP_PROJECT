var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var Url = require('url');
var url = require('../config/dbCreationAndConnection');

class objDbCRUD {
	constructor(){};

	CreateTest(callback)
	{

		// var address = url;
		// var q = Url.parse(address, true);
		//
		// console.log(q); //returns 'localhost:8080'
		// console.log("PathName = " + q.pathname);
		// q.pathname = "Tesg";
		// console.log("HREF " + q.href);
		// var newADR = q.protocole + '//' + q.auth + '@' + q.hostname + '/' + q.pathname + q.search;
		// console.log("NEW ADDR = " + newADR);


		MongoClient.connect(url, { useNewUrlParser: true }, function(err, db)
		{
			var dbo = db.db("HealthSafe");
			dbo.collection("userconnections").find({}).toArray(function(err, result) //.findOne({}, function(err, result) {
			{
				if (err)
					throw err;
				db.close();
				return callback(JSON.stringify(result, null, 4));
			});
		});
	};


	CreateTest2(nameCollection, callback2)
	{
	    this.m_nameCollection = nameCollection;
		MongoClient.connect(url, { useNewUrlParser: true }, function(err, db)
		{
			if (err)
				throw err;
			var dbo = db.db(process.env.DATABASE_DB);
			dbo.createCollection(toString(nameCollection), function(err)
			{
				if (err)
					throw err;
				//console.log("Collection created! Name Collection = " + process.env.DATABASE_DB);
				db.close();
				// return callback2(console.log("Collection created! Name Collection = " + process.env.DATABASE_DB));
				return callback2("Collection created! Name Collection = " + nameCollection);
			});
		});
	};

	CreateTest3()
	{
		MongoClient.connect(url, { useNewUrlParser: true }, function(err, db)
		{
			var dbo = db.db(process.env.DATABASE_DB);
			dbo.listCollections().toArray(function(err, collInfos) {
				console.log("TEST");
				console.log(collInfos);
				db.close();
			});
		});
	}

	CreateTest4()
	{
		MongoClient.connect(url, { useNewUrlParser: true }, function(err, db)
		{
			var dbo = db.db(process.env.DATABASE_DB);

			dbo.admin().listDatabases().then(function(databases){
				console.log("TESTTTTTT");
				console.log(databases);
				console.log("ENDDDDD TESSST");
			});
		});
	};
};

exports.objDbCRUD = objDbCRUD;
