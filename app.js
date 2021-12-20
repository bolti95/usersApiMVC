require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");
// const { auth } = require("express-openid-connect");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
// const connectDB = require("./config/db");
const app  = express();
// look up what below means
app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
app.use(session({
  // TODO
  // secret, stores session secret
  secret: process.env.APP_SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
// TODO
// if (app.get('env') === 'production') {
//   app.set('trust proxy', 1) //trust 1st proxy
//   session.cookie.secure = true //serve secure cookies
// }
// app.use(session(sess))

// set our default template engine to "ejs"
// which prevents the need for using file extensions
app.set('view-engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

// middleware, method returns middleware
// used in request
//body-parser extracts the entire body portion 
//of an incoming request stream and exposes it on req. body .
//url encoded query strings. Extended data, so we can handled 
//nested data coming in query strings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enabled routes so client can speak to the server
// appended api to / so identified as api
app.use("/api", indexRouter);
app.use("/api/users", usersRouter);

module.exports = app;


