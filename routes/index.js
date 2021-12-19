var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
    // console.log(req.oidc.isAuthenticated());
    res.status(200).render('pages/index.ejs',{message: "get success"})
    // get user from model
});

module.exports = router;
