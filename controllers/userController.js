require('dotenv').config();
const config = require("../config/auth");
const connectDB = require("../config/db");
const authController = require("./authController");
connectDB();
const Users = require("../models/User");
const querystring = require('querystring');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup_get = (req, res) => {
    res.status(200).render('pages/signup.ejs', {message: ""});
}

exports.signup_post = async (req, res) => {
    const {username, email, password }  = req.body;
    console.log(username, email, password);
    let uniqueUser = await Users.checkExists(username, email);
    if ({username, email, password } === "") {
        return res.render('pages/signup.ejs', {message : 'Unsuccessful. One or more values is blank.'})
    }
    if (!uniqueUser) {
        return res.send({message : 'Unsuccessful. A user with this email already exists.'}) 
    }  
    const hash = bcrypt.hash(password, 12)
    const user = new Users ({
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password: await hash,
        // isLoggedIn: false
        // createdAt: new Date(), set in schema
    });
    user.save();
    // req.session.token = token
    res.status(200).send({
        message: "successfully signed up the user!"
    })
    // return res.redirect(301, "profile/:username")
    // res.redirect('pages/signup.ejs', {
    //     message : 'Successful sign up!', 
    // })
// } 
}

exports.login_get = (req, res) => {
    res.status(200).render("pages/login.ejs", {message: ""})
}

exports.login_post = async (req, res) => {
    const { username, attempt} = req.body;
    console.log(username, attempt, token)
    const user = await Users.compareUser(username);
    const valid = await Users.checkPassword(attempt, user.password) 
    const id = user._id
    if (!valid) {
        return res.render("pages/login.ejs",  {
            message: "Does not match",
            // accessToken: null
        })  
    }
    var token = jwt.sign({ id: user._id}, config.secret, {
        expiresIn: 86400, // expires in 24hrs
        // accessToken: 
    })
    console.log("this is the token " + token)
    // req.session.token = token
    // req.session.id = user._id;
    // req.session.username = user.username
    if (!token) {
        return res.redirect("/login");
    }
    res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        accessToken: token
    });
    // res.redirect(301, "profile/:username")
    // next()
    // TODO 
    // change User.isLoggedIn into sessionID
    // req.session.save();
    // }) 
    // res.send({
    //     id: user._id,
    //     accessToken: token
    // })
}

exports.logout_get = (req, res) => {
    //destroy a user session
    //set logged in to false
}

exports.delete_user_get = async (req, res) => {
    // install sessions to get user name, or query, or match token
    res.status(200).render('pages/delete.ejs', {message: ""})
}
exports.delete_user = async (req, res) => {
    const queryUsername = req.query.username;
    const queryPassword = req.query.password;
    console.log(queryUsername, queryPassword)
    const user = await Users.compareUser(queryUsername);
    console.log(user.username)
    const valid = await Users.checkPassword(queryPassword, user.password) 
    if (!valid) {
        return res.render("pages/login.ejs",  {
            message: "Does not match",
            accessToken: null
        }) 
    }    
    // auth with password, if !password, don't let them delete
    await Users.findByIdAndDelete( user._id )
    console.log("Successfully deleted!")
    res.send({message: `deleted user ${user.username}`})

    // To add auth

}


exports.user_read = async (req, res) => {
    const query = req.query.username;
    console.log(query)
    const user = await Users.compareUser(query);
    // const found = Users.find(x => x._id === parseInt(user._id));
    if (!user) res.status(404).send("The user with this ID does not exist")// 404, object not found. If resource does not exist.
    res.send(user)
}

exports.profile_get = (req, res) => {
    var authorise = authController.verify_token 
    console.log(authorise);
        // jwt.verify(token, config.secret, (err, decoded) => {
    //     if (err) {
    //         console.log(err.message)
    //         res.redirect("/login");
    //     } else {
    //         console.log(decoded)
    //         req.session.id = id;
    //         req.session.username = user.username
    //         req.session.token = token
    //         res.redirect(301, "profile/:username")
    //     }
    // })
    const username = req.body.username
    // const username = Users.findById(username);
    res.status(200).render("pages/profile.ejs", {
        id: req.session._id, 
        username: username
    })
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