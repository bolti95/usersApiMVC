const Users = require("../models/User");
require('dotenv').config();
const bcrypt = require("bcrypt");
const connectDB = require("../config/db");

exports.signup_get = (req, res) => {
    res.status(200).render('pages/signup.ejs', {message: ""});
}

exports.signup_post = async (req, res) => {
    connectDB();
    const {username, email, password }  = req.body;
    console.log(username, email, password);
    let existingUser = await Users.checkExists(username, email);
    if (existingUser) {
        return res.render('pages/signup.ejs', {message : 'Unsuccessful. A user with this email already exists.'})
    }
    const hash = bcrypt.hash(password, 12)
    const user = new Users ({
        // id: Users.length + 1,
        username: username.toLowerCase(),
        email: email,
        password: await hash,
        // createdAt: new Date(), set in schema
    });
    console.log(user)
    user.save();
    res.status(200).res.render('pages/signup.ejs', {message : 'Successful sign up!'})
}

exports.login_get = (req, res) => {
    res.status(200).render("pages/login.ejs", {message: ""})
}

exports.login_post = async (req, res) => {
    connectDB();
    const { username, attempt } = req.body;
    const user = await Users.compareUser(username);
    const valid = await Users.checkPassword(attempt, user.password) 
    if (!valid) {
        return res.render("pages/login.ejs",  {message: "Does not match"})  
    }
    // next()
    res.redirect(301, "profile/")
}


exports.logout_post = (req, res) => {
    //destroy a user session
    //set logged in to false
}

exports.delete_user_get = async (req, res) => {
    res.status(200).render('pages/delete.ejs', {message: ""})
}
exports.delete_user = async (req, res) => {
    connectDB();
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
    connectDB();
    const user = Users.find(x => x.id === parseInt(req.params.id));
    if (!user) res.status(404).send("The user with this ID does not exist")// 404, object not found. If resource does not exist.
    res.send(user)

}

exports.profile_get = (req, res) => {
    // const username = req.body get user from user model session ID
    res.status(200).render("pages/profile.ejs")
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