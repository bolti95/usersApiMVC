var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
    // console.log(req.oidc.isAuthenticated());
    res.render('pages/index.ejs', { user: ""},{message: ""})
    // get user from model
});

module.exports = router;
