const Joi= require('joi');
const mongoose =require('mongoose');

const Transaction= mongoose.model('transactions_info', new mongoose.Schema({
        Transaction_No: {
            type: String,
            required: true
        }
    })
);

function validateTransaction(transaction){    
    const schema= {
        transaction_no: Joi.string().min(10).required(),
    };
    return Joi.validate(transaction,schema);
}

module.exports.Transaction= Transaction;
module.exports.validateTransaction= validateTransaction;