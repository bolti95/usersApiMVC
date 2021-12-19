require('dotenv').config();
const config = require("../config/auth");
const querystring = require('querystring');

const handleError = (err) => {
    console.log(err.message, err.code);
}

// exports.valueChecker = (value) => {
//     if (value === "") {
//         return res.render('pages/signup.ejs', {message : 'Unsuccessful. Email required.'})
//     }
// }

// exports.use_secret = (req, res) => {
//     const secret = config.secret;
//     if (secret === process.env.APP_SESSION_SECRET) {
//         return
//     } else {
//         res.send 
//     }
// }

//handle auth error
// module.exports = [
//     valueChecker
// ];