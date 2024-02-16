'use strict';

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PolicyplanSchema = new Schema({
    policyCode: {
        type: String,
        required: true
    },
    policyName: {
        type: String,
        required: true
    },
    policyType: {
        type: String,
        required: true
    },
    varient: {
        type: String,
        required: true
    },
    tenor: {
        type: Number,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    slab: {
        type: String,
    },
    additionalHealth: {
        type: String,
    },
    totalGridAmount: {
        type: String,
    },
    gridOnOD: {
        type: String,
    },
    usgiNet: {
        type: String,
    },
    numNet: {
        type: String,
    },
    numNetTp: {
        type: String,
    },
    terrorism: {
        type: String,
    },
    commisionPer: {
        type: String,
    },
    commisionAmount: {
        type: String,
    },
    isLock: {
        type: String,
        required: true
    },
    isActive: {
        type: String,
        required: true
    }
})

const policyPlanMasterSchema = mongoose.model('sttm_policy_plan_master', PolicyplanSchema)

module.exports = policyPlanMasterSchema