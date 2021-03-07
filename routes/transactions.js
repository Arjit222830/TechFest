const Joi= require('joi');
const express = require('express');
const router = express.Router();
const {Register}= require('../models/register');
const {Transaction, validateTransaction}= require('../models/transaction');

router.get('/',async function(req,res){
    const registers= await Register.find();
    const transactions= await Transaction.find();
    res.status(200).render('event_management',{registers: registers,transactions: transactions});
});

router.post('/transaction',async (req,res)=>{

    const {error}= validateTransaction(req.body);//result.error(joi package)
    if(error)
        return res.status(400).send(error.details[0].message);

    if(req.body.transaction_no.length<10)
        return res.status(400).send('Enter Valid Transaction ID');

    let user= await Transaction.findOne({ Transaction_No: req.body.transaction_no});

    if(user)
        return res.status(400).send('Transaction Id already entered..');

    const transaction= new Transaction({
        Transaction_No: req.body.transaction_no
    });
        
    await transaction.save();
    
    res.send({message:'Transaction ID added',link:'/'});
});


module.exports = router;