'use strict';

const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const CompanyCodeSchema=new Schema({
    companyCode:{
        type:String,
        required:true,
    },
    companyName:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    country:{
        type:String
    },
    state:{
        type:String
    },
    city:{
        type:String
    },
    pinCode:{
        type:String
    },
    mobile:{
        type:String,
        required:true 
    },
    mailId:{
        type:String,
        required:true 
    },
    companyRegistrationNo:{
        type:String,
        required:true 
    },
    panNumber:{
        type:String,
        required:true 
    },
    isLock:{
        type:String
    },
    isActive:{
        type:String
    }
})

const companyCodeMasterSchema=mongoose.model('sttm_company_code',CompanyCodeSchema)

module.exports=companyCodeMasterSchema