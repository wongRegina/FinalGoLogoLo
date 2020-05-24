var express = require('express');
var router = express.Router();

module.exports = function (passport) {
    return router.get('/',
        passport.authenticate('google', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));
}