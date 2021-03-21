const mongoose =require('mongoose');

const Payment= mongoose.model('payment', new mongoose.Schema({
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
        }
    })
);


module.exports.Payment= Payment;