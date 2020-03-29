var MongoClient = require('mongodb').MongoClient;
var urlParser = require('url-parse');
var url = require('../config/dbCreationAndConnection');
var userConnection = require('../models/modelConnection');


class dbInsert
{
	m_resultParseUrl;
	m_urlDB;
	constructor()
	{
		this.m_resultParseUrl =  new urlParser(url, true);
		this.m_urlDB = null;
	};

};

exports.dbInsert = dbInsert;
