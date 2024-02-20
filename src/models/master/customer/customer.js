'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CustomerMasterSchema = new Schema({
    customerType: {
        type: String,
        required: true,
    },
    customerId: {
        type: String,
        required: true,
    },
    customerName:{
        type: String,
        required: true,  
    },
    address: {
        type: String,
        required: true,
    },
    filePath:{
        type:String
    },

    country: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },

    pinCode: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true
    },
    mailId: {
        type: String,
    },
    dob: {
        type: String,
        required: true,
    },    
    isLock: {
        type: Boolean,
    },
    isActive:{
        type:String,
        required:true
    }
})


const customerMasterSchema = mongoose.model('sttm_customer_master', CustomerMasterSchema);

module.exports = customerMasterSchema;