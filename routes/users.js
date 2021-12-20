var express = require("express");
var router = express.Router();
// var auth = require("../config/auth.js");
var auth_controller = require("../controllers/authController.js");
var user_controller = require("../controllers/userController.js");

router.get("/", (req, res) => {
    res.render("pages/index.ejs", {message: ""});
    // res.redirect("/");
})

// USER ROUTES // 
// achieves loose coupling by using controller exports
// create user
router.get("/signup", user_controller.signup_get)
router.post("/signup", user_controller.signup_post)

// send req to make the user active
// check it exists/ is authorised 
router.get("/login", user_controller.login_get)
router.post("/login", user_controller.login_post, user_controller.profile_get)
router.get("/logout", user_controller.logout_get)

// read user
router.get("/read/:username", user_controller.user_read)
router.put("/update/:username", (req, res) => {});


router.get("/profile/:username", user_controller.profile_get);


router.get("/delete/:username", user_controller.delete_user_get);
// router.get("/delete/:username", (req, res) => {
//     res.redirect(res.redirect(301, "delete/"));
// });
// delete user
router.post("/delete/:username", user_controller.delete_user);

// figure out how to use Secret key in req
router.delete("/delete/:username", 
    // auth_controller.verify_token, 
    user_controller.delete_user
);


module.exports = router;