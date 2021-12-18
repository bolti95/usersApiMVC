require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { auth } = require("express-openid-connect");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
// const connectDB = require("./config/db");
const authConfig = require("./config/auth");

const app  = express();
// set our default template engine to "ejs"
// which prevents the need for using file extensions
app.set('view-engine', 'ejs')
// set views for error and 404 pages
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// middleware, method returns middleware
// used in request
//can be handled in regards to payloads
//query strings and post type payloads that might contain json
//url encoded query strings. Extended data, so we can handled 
//nested data coming in query strings

//auth router attaches /login, /logout and /callback router to baseURL
app.use(auth(authConfig));
app.use("/api", indexRouter);
app.use("/api/users", usersRouter);

module.exports = app;


