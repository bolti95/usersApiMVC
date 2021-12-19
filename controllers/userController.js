const Users = require("../models/User");
require('dotenv').config();
const config = require("../config/auth");
const connectDB = require("../config/db");
connectDB();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.signup_get = (req, res) => {
    res.status(200).render('pages/signup.ejs', {message: ""});
}

exports.signup_post = async (req, res) => {
    const {username, email, password }  = req.body;
    console.log(username, email, password);
    let existingUser = await Users.checkExists(username, email);
    if (existingUser) {
        return res.render('pages/signup.ejs', {message : 'Unsuccessful. A user with this email already exists.'})
    }
    else {
        const hash = bcrypt.hash(password, 12)
        const user = new Users ({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: await hash,
            // isLoggedIn: null
            // createdAt: new Date(), set in schema
        });
        user.save();
        var token = jwt.sign({ id: user._id}, config.secret, {
            expiresIn: 86400 // expires in 24hrs
        })
        req.session._id = user._id;
        req.session.username = user.username;
        req.session.token = token;
        // req.session.save();
        return res.status(200).render('pages/signup.ejs', {
            message : 'Successful sign up!', 
            accessToken: token,
            username: req.session.username
        })
    }
}

exports.login_get = (req, res) => {
    res.status(200).render("pages/login.ejs", {message: ""})
}

exports.login_post = async (req, res) => {
    const { username, attempt } = req.body;
    const user = await Users.compareUser(username);
    const valid = await Users.checkPassword(attempt, user.password) 
    const id = user._id
    if (!valid) {
        return res.render("pages/login.ejs",  {
            message: "Does not match",
            accessToken: null
        })  
    }
    var token = jwt.sign({id: user._id},
        config.secret, {
            expiresIn: 86400 //24hours
        })
    // change User.isLoggedIn into sessionID
    req.session.id = user._id;
    req.session.username = user.username
    req.session.token = token
    res.redirect(301, "profile/:id")
    // , {
    //     message : 'Successful sign up!', 
    //     // token: req.session.token,
    //     // username: req.session.username,
    //     // id: req.session.id
    // }) 
    // res.send({
    //     id: user._id,
    //     accessToken: token
    // })
}


exports.logout_post = (req, res) => {
    //destroy a user session
    //set logged in to false
}

exports.delete_user_get = async (req, res) => {
    // install sessions to get user name
    res.status(200).render('pages/delete.ejs', {message: ""})
}
exports.delete_user = async (req, res) => {
    const { username, attempt } = req.body;
    console.log(username)
    const user = await Users.compareUser(username);
    const _id = user._id
    console.log("trying to delete...")
    await Users.findByIdAndDelete( _id )
    console.log("success!")
    res.redirect(301, "/")
    // auth with password, if !password, don't let them delete
}


exports.user_read = (req, res) => {
    const user = Users.find(x => x.id === parseInt(req.params.id));
    if (!user) res.status(404).send("The user with this ID does not exist")// 404, object not found. If resource does not exist.
    res.send(user)

}

exports.profile_get = (req, res) => {
    // const {id, token, username} = req.body.id
    // const token = req.body.token
    // const username = req.session.username;
    // const id = req.session.id;
    // const token = req.session.token;
    // console.log(req.session.id)
    // Users.findById(req.session.id)
    // jwt.verify(token, config.secret, function(err, decoded) {
    //     if (err) return res.status(500).send({auth : false, message: "Failed to authenticate."})
    //     User.findById(decoded._id,{
    //         password: 0, //protect
    //         function (err, user) {
    //             if (err) return res.status(500).send("Could not find user.");
    //             if (!user) return res.status(404).send("User does not exist");
    //             next(user)
    //         }
    //     }) 
    res.status(200).render("pages/profile.ejs", {
        id: req.session._id, 
        username: req.session.username
    })
    // }) 

    // const username = req.body get user from user model session ID
}

exports.profile_post = (req, res) => {
    const { user } = req.body
    res.send(user)
}



// exports.user_delete = async (req, res) => {
//     const user = await Users.compareUser(username);
//     const { username, attempt } = req.body;
//     const valid = await Users.checkPassword(attempt, user.password) 
//     if (!valid) {
//         return res.render("pages/delete.ejs",  {message: "Does not match"})  
//     } 
//     else {
//         return res.redirect(301, "delete/")
//         // const query = { user }
//         // console.log(query)
//         // const userToDelete = Users.findByIdAndDelete(user._id)
//         // console.log(userToDelete)
//         // res.render("pages/delete.ejs", {message: "No account matched."})
//         // const result = await Users.deleteOne(query);
//         // console.log(result)
       
//         // if (result.deletedCount === 1) {
//         //     return res.render("pages/index.ejs", {message: "Account successfully deleted."})
//         // } else {
//         //     return res.render("pages/delete.ejs", {message: "No account matched."})
//         // }
//     }
// }

    // let hashedPw = await bcrypt.hash(attempt, 12)
    // if (await Users.checkExists(req.body.username) === true) {
    //     res.render (("pages/login.ejs", {message: "No existing username. Signup."}))
    // } 
    // if (await Users.checkPassword(username, password)) {

    // }
    // match username and password
    //use find username password user function
    //accept login and session auth
    //change logged in value to true
    // Users.findOne({email : email}).exec((err,user)=>{
    //     console.log(user);
    //     if (user) {

    //     } else {

    //     }
    // })