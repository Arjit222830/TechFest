const express= require('express');
const router= express.Router();
const {Register, validate}= require('../models/register');

router.get('/:Event',async function(req,res){
    res.status(200).render('register',{Event: req.params.Event, yearEnum:Register.schema.path('year').enumValues});
});

module.exports= router;