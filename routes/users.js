var express = require("express");
var router = express.Router();
var user_controller = require("../controllers/userController.js");

router.get("/", (req, res) => {
    res.render("pages/index.ejs", {message: ""});
    // res.redirect("/");
})

// USER ROUTES //
router.get("/signup", user_controller.signup_get)
router.post("/signup", user_controller.signup_post)

router.get("/login", user_controller.login_get)
router.post("/login", user_controller.login_post)

router.get("/read/:id", user_controller.user_read)
router.put("/update/:id", (req, res) => {});

router.get("/profile/", user_controller.profile_get);

router.get("/delete/:username", user_controller.delete_user_get);
// router.get("/delete/:username", (req, res) => {
//     res.redirect(res.redirect(301, "delete/"));
// });
router.post("/delete/:username", user_controller.delete_user);
router.delete("/delete/:username", user_controller.delete_user);


module.exports = router;