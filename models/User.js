const {model, Schema, Types } = require('mongoose');
const bcrypt = require('bcrypt');

const user = Schema({
    // id: {type: Number, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: false},
    password: {type: String, required: true, unique: false},
    createdAt: {type: Date, default: Date.now, unique: false}
})

// Statics are pretty much the same as methods 
// but allow for defining functions that exist directly on your Model.
// Mongo docs https://mongoosejs.com/docs/2.7.x/docs/methods-statics.html
user.statics.checkExists = async function(username) {
	let user = await this.findOne({ username });
    console.log("the user")
    if (!user) {
        console.log(user)
        return true
    } else {
        return false
    }
}

user.statics.compareUser = async function(username) {
    let user = await this.findOne({ username });
    if (user) {
        console.log(user)
        return user
    } else {
        return false
    }
}

user.statics.checkPassword = async function (attempt, password) {
    console.log("the user and attempt " + attempt, password)
    const validPw = await bcrypt.compare(attempt, password)
    console.log("valid Pw = " + validPw)
    // let hashedPw = await bcrypt.hash(attempt, 12)
    if (validPw) {        
        console.log("Valid pw")
        return true 
    } else {
        return false
    }
}


// user.statics

module.exports = model('user', user)