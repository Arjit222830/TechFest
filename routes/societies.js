const express= require('express');
const router= express.Router();
const {Society, validate}= require('../models/society');

router.post('/',async (req,res)=>{
    const {error}= validate(req.body);//result.error(joi package)
    if(error)
        return res.status(400).send(error.details[0].message);

    let event= await Society.findOne({ Event_Name: req.body.event});
    if(event)
        return res.status(400).send('Event already registered..');

    const society= new Society({
        Society_Name: req.body.society,
        Event_Name: req.body.event,
        About: req.body.about,
        Rules:{
            1:req.body.r1,
            2:req.body.r2,
            3:req.body.r3,
            4:req.body.r4
        },
        Co_ordinator1: req.body.c1,
        Co_ordinator2: req.body.c2,
        Venue: req.body.venue,
        Fee: req.body.fee,
        Prize_Money: req.body.prize+" Max.",
        Maximum_Members: req.body.max_mem,
        Event_Date: req.body.date,
        Event_Time: req.body.time,
        Poster_Url: "../posters/"+req.body.poster+".jpg"
    });
    
    await society.save();

    res.send({message:'Society Registeration Successful',link:'/'});
});

module.exports= router;