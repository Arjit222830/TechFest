const express= require('express');
const router= express.Router();
const jwt= require('jsonwebtoken');
const config= require('config');
const auth= require('../middleware/auth');
const getCookies=  require('../middleware/getCookies');
const {Payment}= require('../models/payment');
const {Register, validate}= require('../models/register');
var Razorpay= require('razorpay');
var instance = new Razorpay({ key_id: config.get('paymentID'), key_secret: config.get('paymentSecret')});

router.get('/',async function(req,res){

    var cookies= await getCookies(req);

    if(cookies==0)
        return res.send('There seems to be some unauthorised access visiting this page');

    if(!cookies)
        res.send('This seems to be some illegal attack.');

    if(!cookies['x-auth-token'])
        res.send('Token Not available');

    console.log(JSON.parse(decodeURIComponent(cookies['data']).substring(2)));
    
    res.render('payment',{order:cookies['order'],paymentID:cookies['id']})
});

router.post('/:Event',async (req,res)=>{

    console.log(req.params.Event);

    const {error}= validate(req.body);//result.error(joi package)
    if(error)
        return res.status(400).send(error.details[0].message);

    let user= await Register.findOne({ email: req.body.email});

    if(user)
        return res.status(400).send('User already registered..');

    var data= {
        amount: 5000,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
    };

    await instance.orders.create(data, async function(err, order) {
        const token = jwt.sign({order: order.id}, "Arjit");
        res.cookie('x-auth-token',token,{ expires: new Date(Date.now() + 1000*500), httpOnly: true });
        res.cookie('order',order.id,{ expires: new Date(Date.now() + 1000*500), httpOnly: true });
        res.cookie('id',config.get('paymentID'),{ expires: new Date(Date.now() + 1000*500), httpOnly: true });
        res.cookie('data',req.body,{ expires: new Date(Date.now() + 1000*500), httpOnly: true });
        res.send({link:'/payment',message:'Moving to payment page'});
    });
});

router.post('/',async (req,res)=>{

    var cookies= await getCookies(req);

    if(cookies==0)
        return res.send({message:'Payment Failed. Contact the service provider for any query',link:'/'});

    var data= JSON.parse(decodeURIComponent(cookies['data']).substring(2));

    const register= new Register({
        ...data,
        Payment_ID: req.body.razorpay_payment_id,
        Order_ID: req.body.razorpay_order_id,
        Signature: req.body.razorpay_signature
    });

    await register.save();
  
    res.send({message:'Payment Done. Registeration Successful',link:'/'});
});


module.exports= router;