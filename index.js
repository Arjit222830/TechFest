var mongoose = require("mongoose");
var express= require("express");
var app = express();
var bodyParser = require("body-parser");
const config= require('config');
const {Event}= require('./models/event');
const events= require('./routes/events');

mongoose.connect(config.get('db'),{useNewUrlParser: true,useUnifiedTopology: true})
.then(()=> console.log(`Connected to ${config.get('db')}...`))
.catch(err => console.log(`Could not connect to ${config.get('db')}...`,err));

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

app.use(express.json());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use('/event',events);

require('./prod.js')(app);

app.set("view engine", "pug");

app.get('/',async function(req,res){
    let events= await Event.find();
    res.status(200).render('competition',{events:events});
});

app.get('/123admin456',async function(req,res){
    res.status(200).render('admin',{src:"./vikiran.js",TYPE:"Adding",unique: "form_admin"});
});

app.get('/details',async function(req,res){
    const events= await Event.find();
    res.status(200).render('details',{events:events});
});

app.get('/details/:event',async function(req,res){
    const registers= await Register.find({event_name:  req.params.event});
    const transactions= await Transaction.find();
    res.status(200).render('info',{registers: registers,event: req.params.event, transactions: transactions});
});

app.get('/123admin456/:id',async function(req,res){
    const event= await Event.find({_id:req.params.id});
    console.log(event);
    res.status(200).render('admin',{src:"../vikiran.js",event:Object.assign({}, event)[0],TYPE:"Updating",unique: "form_admin_update"});
});


app.get('/123transaction456',async function(req,res){
    res.status(200).render('security');
});

const port=process.env.PORT || 3000;
console.log(port);
const server=app.listen(port, ()=> console.log(`Listening on port ${port}...`));
var env = process.env.NODE_ENV || 'development';
console.log(env);
module.exports= server;