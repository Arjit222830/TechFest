const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    const {error}= validate(req.body);//result.error(joi package)
    if(error)
        return res.status(400).send(error.details[0].message);

    let user= await Register.findOne({ email: req.body.email});

    if(user)
        return res.status(400).send('User already registered..');
    
    next();
}