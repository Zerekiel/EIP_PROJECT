var MongoClient = require('mongodb').MongoClient;
var urlParser = require('url-parse');
var url = require('../config/dbCreationAndConnection');
var userConnection = require('../models/modelConnection');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


const jwt = require('jsonwebtoken')

const auth = async(req, res, next) => {

    // const token = req.header('Authorization').replace('Bearer ', '')
    // const data = jwt.verify(token, process.env.JWT_KEY)
    try {
	    const token = req.header('Authorization').replace('Bearer ', '')
	    const data = jwt.verify(token, process.env.JWT_KEY)
        const user = await userConnection.findOne({ _id: data._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(500).send({ error: 'Not authorized to access this resource' })
    }
}

// class auth
// {
// 	m_resultParseUrl;
// 	m_urlDB;
//
// 	constructor()
// 	{
// 		this.m_resultParseUrl =  new urlParser(url, true);
// 		this.m_urlDB = null;
// 	};

// };

exports.auth = auth;
