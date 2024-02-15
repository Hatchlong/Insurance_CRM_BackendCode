'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CustomerNomineeSchema = new Schema({
    customerId: {
        type: String,
        required: true
    },
    nomineeDetails: [{
        nomineeName: {
            type: String
        },
        relationship: {
            type: String
        },
        dob: {
            type: String
        },
        ofShare: {
            type: String
        },
        isLock: {
            type: Boolean,
        }
    }]
})


const customerNomineeSchema = mongoose.model('sttm_customer_nominee_master', CustomerNomineeSchema);

module.exports = customerNomineeSchema;