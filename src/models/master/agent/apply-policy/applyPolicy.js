'use strict';

const mongoose = require('mongoose');
const policyPlanMasterSchema = require('../policy-plan/policy-plan');
const Schema = mongoose.Schema;

const ApplyPolicySchema=new Schema({
    customerName: {
        type:String,
        required:true
    },
    policyType: {
        type:String,
        required:true
    },
    policyCompany: {
        type:String,
        required:true
    },
    policyCode: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    issueDate: {
        type:String,
        required:true
    },
    startDate: {
        type:String,
        required:true
    },
    expiryDate: {
        type:String,
        required:true
    },
    polcyNo:{
        type:String,
        required:true
    },
    isLock:{
        type:String,
        required:true
    },
    isActive:{
        type:String,
        required:true
    }
})

const policyplanSchema=mongoose.model('sttm_apply_policies',ApplyPolicySchema)

module.exports=policyplanSchema