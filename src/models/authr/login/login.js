'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const LoginSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique:true
    }, 
    password: {
        type: String,
        required: true,
    },
    token:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        required:true  
    }
    
})


const loginSchema = mongoose.model('sttm_login', LoginSchema);

module.exports = loginSchema;