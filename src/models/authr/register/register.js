'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const RegisterSchema = new Schema({
    userName: {
        type: String,
        required: true,
    }, 
    emailId: {
        type: String,
        required: true,
        unique:true
    }, 
    password: {
        type: String,
        required: true,
    }
    
})


const registerSchema = mongoose.model('sttm_user', RegisterSchema);

module.exports = registerSchema;