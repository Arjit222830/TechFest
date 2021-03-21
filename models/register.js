const Joi= require('joi');
const mongoose =require('mongoose');
const Register= mongoose.model('registrations', new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    college_name: {
        type: String,
        required: true
    },
    enroll_no: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true,
        enum: ["1st","2nd","3rd","4th"]
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
        name: Joi.string().min(1).max(50).required(),
        college_name: Joi.string().min(1).max(50).required(),
        enroll_no: Joi.string().required(),
        year: Joi.string().required(),
        email: Joi.string().min(5).max(255).required().email(),
        contact: Joi.string().length(10).required()
    };
    return Joi.validate(register, schema);
}

module.exports.Register= Register;
module.exports.validate=validateRegister;