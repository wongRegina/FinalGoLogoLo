var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', isLoggedIn, function(req, res) {
    //res.send(req.user);
    res.redirect('http://localhost:3001/redirect/'+req.user.uid);
});

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('http://localhost:3001/');
}

module.exports = router;
