'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const LoginSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique:true
    },
    loginTime:{
        type:String
    },
    logoutTime:{
        type:String
    }
    
})


const loginSchema = mongoose.model('sttm_user_log', LoginSchema);

module.exports = loginSchema;