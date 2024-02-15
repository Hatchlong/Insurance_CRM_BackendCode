'use strict';

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AgentSchema = new Schema({
    agentId: {
        type: String,
        required: true,
        unique: true
    },
    agentName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    country: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    pinCode: {
        type: String
    },
    mobile: {
        type: String,
        required: true
    },
    mailId: {
        type: String,
        required: true
    },
    aadharNumber: {
        type: String,
        required: true
    },
    panNumber: {
        type: String,
        required: true
    },
    filePath: {
        type: String
    },
    panFilePath: {
        type: String
    },
    aadharFilePath: {
        type: String
    },
    isLock: {
        type: String
    },
    isActive: {
        type: String
    }
})

const agentMasterSchema = mongoose.model('sttm_agent_master', AgentSchema)
module.exports = agentMasterSchema