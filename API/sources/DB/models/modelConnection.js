const mongoose = require('mongoose');

const connectionSchema = mongoose.Schema({
	userName :
	{
		type : String,
		unique : true,
		required : true,
		trim : true
	},
	password :
	{
		type : String,
		unique : true,
		required : true,
		trim : true
	}
});

var userConnection = mongoose.model('userConnection', connectionSchema, 'UserConnexion');

module.exports = userConnection;
