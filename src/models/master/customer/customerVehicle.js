'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CustomerVehicleSchema = new Schema({
    customerId: {
        type: String,
        required: true
    },
    vechicleDetails: [{
        registrationNo: {
            type: String
        },
        vechicleRegistrationDate: {
            type: String
        },
        make: {
            type: String
        },
        variant: {
            type: String
        },
        model: {
            type: String
        },
        mfgYear: {
            type: String
        },
        engineNo: {
            type: String
        },
        chassisNo: {
            type: String
        },
        vehicleUsage: {
            type: String
        },
        rtoStateCode: {
            type: String
        },
        seatingCapacity: {
            type: String
        },
        fuelType: {
            type: String
        },
        bodyType: {
            type: String
        },
        trailerRegNo: {
            type: String
        },
        isLock: {
            type: Boolean,
        }
    }]
})


const customerVehicleSchema = mongoose.model('sttm_cust_vehicle_master', CustomerVehicleSchema);

module.exports = customerVehicleSchema;