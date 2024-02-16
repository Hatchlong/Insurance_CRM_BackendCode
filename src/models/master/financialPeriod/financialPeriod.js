'use strict';

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const FinancialPerionSchema = new Schema({
    periodCode: {
        type: String,
        required: true,
        unique: true
    },
    fromMonth: {
        type: String,
        required: true
    },
    fromYear: {
        type: String,
        required: true
    },
    toMonth: {
        type: String,
        required: true
    },
    toYear: {
        type: String,
        required: true
    },
    isLock: {
        type: String
    },
    isActive: {
        type: String
    }
})

const financialPeriodSchema = mongoose.model('sttm_period_details', FinancialPerionSchema)
module.exports = financialPeriodSchema