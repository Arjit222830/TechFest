const Joi= require('joi');
const mongoose =require('mongoose');
const Register= mongoose.model('registrations', new mongoose.Schema({
    team_name: {
        type: String,
        required: true
    },
    p1:{
        type: String,
        required: true
    },
    p2:{
        type: String,
        required: true
    },
    p3:{
        type: String,
        required: true
    },
    p4:{
        type: String,
        required: true
    },
    p5:{
        type: String,
        required: true
    },
    college_name: {
        type: String,
        required: true
    },
    contact:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    Payment_ID: {
        type: String,
        required: true
    },
    Order_ID: {
        type: String,
        required: true
    },
    Signature: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
);

function validateRegister(register){    
    const schema= {
        team_name: Joi.string().min(1).max(50).required(),
        p1: Joi.string().min(1).max(50).required(),
        p2: Joi.string().min(1).max(50).required(),
        p3: Joi.string().min(1).max(50).required(),
        p4: Joi.string().min(1).max(50).required(),
        p5: Joi.string().min(1).max(50).required(),
        college_name: Joi.string().min(1).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        contact: Joi.string().length(10).required()
    };
    return Joi.validate(register, schema);
}

module.exports.Register= Register;
module.exports.validate=validateRegister;