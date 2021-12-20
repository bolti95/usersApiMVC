require('dotenv').config();
const jwt = require("jsonwebtoken");
const config = require("../config/auth");
const querystring = require('querystring');


exports.handle_error = (err) => {
    console.log(err.message, err.code);
}

const verify_token = (req, res) => {
    let token = req.headers["x-access-token"];
        if (!token) {
            return res.status(403).send({ message: "No token provided!" });
        } 
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
            }
            return req.id = decoded.id;        
    })
}
module.exports = verify_token;
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