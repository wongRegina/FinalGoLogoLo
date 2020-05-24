var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    req.logout();
    req.session.destroy(function (err) {
        res.clearCookie('connect.sid');
        res.redirect('http://localhost:3001/');
    });
});

module.exports = router;
