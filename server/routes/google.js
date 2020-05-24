var express = require('express');
var router = express.Router();

/* GET home page. */

module.exports = function (passport) {
    return router.get('/', passport.authenticate('google', { scope: ['profile', 'email'], prompt : "select_account" }));
}