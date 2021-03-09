const express= require('express');
const router= express.Router();
const {Event, validate}= require('../models/event');

router.get('/:item',async function(req,res){
    let event= await Event.find({Event_Name: req.params.item});
    res.status(200).render('event',{event:Object.assign({}, event)[0]});
});

router.post('/',async (req,res)=>{
    const {error}= validate(req.body);//result.error(joi package)
    if(error)
        return res.status(400).send(error.details[0].message);

    let e= await Event.findOne({ Event_Name: req.body.event});
    if(e)
        return res.status(400).send('Event already registered..');

    const event= new Event({
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
        Prize_Money: req.body.prize,
        Maximum_Members: req.body.max_mem,
        Event_Date: req.body.date,
        Event_Time: req.body.time,
        Poster_Url: req.body.poster
    });
    
    await event.save();

    res.send({message:'Event Addition Successful',link:'/'});
});

router.put('/:id',async (req,res)=>{

    let event = await Event.findByIdAndUpdate(req.params.id, {
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
        Prize_Money: req.body.prize,
        Maximum_Members: req.body.max_mem,
        Event_Date: req.body.date,
        Event_Time: req.body.time,
        Poster_Url: req.body.poster
    },  {new: true});
    
    console.log(event)
    await event.save();
    res.send({message:'Event Updation Successful',link:'/'});
});

router.post('/delete/:id', async (req,res)=>{
    
    const remove=await Event.deleteOne({_id:req.params.id});
    if(!remove)
        return res.status(404).send("Given ID was not found");//404 is error not found
    
    res.redirect('/');
});

module.exports= router;