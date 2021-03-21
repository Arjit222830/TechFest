const jwt = require('jsonwebtoken');
const config = require('config');
const {Register, validate}= require('../models/register');
var Razorpay= require('Razorpay');
var instance = new Razorpay({ key_id: config.get('paymentID'), key_secret: config.get('paymentSecret')});

module.exports = function (req, res, next) {
    var data= {
        amount: 100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
    };
    console.log(data);
    let order="Ar";
    await instance.orders.create(data, async function(err, order) {
        const token = jwt.sign({order: order.id}, "Arjit");
        console.log("token:"+token);
        console.log("order:"+order.id);
        if(!token)
            res.send("Token not found");
        res.cookie('order.id',order.id);
        res.cookie('register',req.body);
        res.cookie('paymentID',config.get('paymentID'));
    });
    
    next();
}