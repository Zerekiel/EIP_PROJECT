const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
sha3_512 = require('js-sha3').sha3_512;

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
	},
	tokens: [{
		token: {
			type: String,
			required: true
		}
	}]

});

// connectionSchema.pre('save', async function (next) {
//     // Hash the password before saving the user model
//     const user = this
//     if (user.isModified('password')) {
//         user.password = await bcrypt.hash(user.password, 8)
//     }
//     next()
// })
//
// connectionSchema.generateAuthToken = async function() {
//     // Generate an auth token for the user
//     const user = this
//     const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
//     user.tokens = user.tokens.concat({token})
//     await user.save()
//     return token
// }


// connectionSchema.findByCredentials = async (userName, password) => {
//
//     // Search for a user by email and password.
//     const user = await User.findOne({ userName} )
//     if (!user) {
//         throw new Error({ error: 'Invalid login credentials' })
//     }
//     const isPasswordMatch = await bcrypt.compare(password, user.password)
//     if (!isPasswordMatch) {
//         throw new Error({ error: 'Invalid login credentials' })
//     }
//     return user
// }


connectionSchema.pre('save', async function (next) {
    // Hash the password in sha3_512 before saving the user model
		const user = this

    if (user.isModified('password')) {
			user.password =  sha3_512(user.password)
    } if (user.isModified('userName')) {
			user.userName = sha3_512(user.userName)
    }
    next()
})

connectionSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}


connectionSchema.statics.findByCredentials = async (userName, password) => {
    // Search for a user by email and password.

    const user = await userConnection.findOne({userName});

    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }

				// const isPasswordMatch = await bcrypt.compare(password, user.password)
				 const isPasswordMatch = compare(sha3_512(password) === user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}

// var userConnection = mongoose.model('userConnection2', connectionSchema);


var userConnection = mongoose.model('userConnection', connectionSchema, 'UserConnexion');

module.exports = userConnection;
