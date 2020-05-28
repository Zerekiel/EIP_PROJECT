const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const modelSignup = require('./modelSignup');


const signinSchema = mongoose.Schema({
	email :
	{
		type : String,
		required : true,
		trim : true
	},
	password :
	{
		type : String,
		required : true,
		trim : true,
		minLength: 7,
		maxLength: 20
	},
	tokens: [{
		token: {
			type: String,
			required: true
		}
	}]

});

signinSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next()
})

signinSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY);
    user.tokens = user.tokens.concat({token});
    await user.save();

    return token
}


signinSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.s
    // console.log(email)
    const user = await modelSignup.modelSignup.findOne({email: email});

    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }

        const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}

var modelSignin = mongoose.model('signin', signinSchema, 'signin');

module.exports = {
	modelSignin
}
