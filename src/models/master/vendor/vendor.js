'use-strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const VendorSchema = new Schema({
    vendorId: {
        type: String,
        required: true
    },
    vendorName: {
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
    postalCode: {
        type: String
    }, 
    isLock: {
        type:String
    },
    isActive:{
        type: String

    }
})

const vendorMasterSchema = mongoose.model('sttm_vendor_master', VendorSchema)

module.exports = vendorMasterSchema