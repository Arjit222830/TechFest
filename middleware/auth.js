const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    
    /*console.log("token:"+token);
    if(!token)
        res.send("Token not found");*/
    next();
}