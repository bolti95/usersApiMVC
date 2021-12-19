require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");
const { auth } = require("express-openid-connect");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
// const connectDB = require("./config/db");
const app  = express();

app.use(session({
  // TODO
  // sess in production
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
//query strings and post type payloads that might contain json
//url encoded query strings. Extended data, so we can handled 
//nested data coming in query strings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//auth router attaches /login, /logout and /callback router to baseURL
// app.use(auth(authConfig));
app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});
app.use("/api", indexRouter);
app.use("/api/users", usersRouter);

module.exports = app;


