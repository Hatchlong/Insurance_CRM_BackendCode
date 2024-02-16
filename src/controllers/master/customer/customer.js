'use strict';

const express = require('express');
const router = express.Router();

const customerModel = require('../../../models/master/customer/customer');
const customerNomineeModel = require('../../../models/master/customer/customerNominee');
const customerVehicleModel = require('../../../models/master/customer/customerVehicle');
const customerVehicleControllers = require('./customerVehicle');

const createCustomer = async (req, res, next) => {
    try {
        req.body.isLock = false;
        req.body.isActive = 'O';
        
        const findcustomerDetails = await customerModel.findOne({ customerId: req.body.customerId }).lean();
        if (findcustomerDetails) {
            return res.status(200).json({
                status: '0',
                message: 'Customer Id is already exist'
            })
        }
        const customerCreate = await new customerModel(req.body);
        const result = customerCreate.save();
        if (result) {
            if (req.body.vehicleDetails.length !== 0) {
                req.body.customerId = req.body.customerId
                customerVehicleControllers.createCustomerVehicleDetails(req, res, next)

            } else {
                res.status(200).json({
                    status: '1',
                    message: 'Customer Created Successfully'
                })
            }

        } else {
            res.status(200).json({
                status: '0',
                message: 'Customer Created unSuccessfully'
            })
        }
    } catch (error) {
        console.error(error);
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Customer Created unSuccessfully'
        })
    }
}


const getAllCustomerDetails = async (req, res, next) => {
    try {
        const customerDetails = await customerModel.find({ isActive: 'O' }).sort('-1').lean();
        if (customerDetails) {
            const customerVehicleDetails = await customerVehicleModel.find({}).sort('-1').lean();
            const productSalesDetails = await customerNomineeModel.find({}).sort('-1').lean();

            customerDetails.forEach((obj1) => {
                const matchingVehicleData = customerVehicleDetails.find((obj2) => obj2.customerId === obj1.customerId);
                const matchingNomineeDetails = productSalesDetails.find((obj2) => obj2.customerId === obj1.customerId);
                if (matchingVehicleData || matchingNomineeDetails) {
                    obj1.vehicleDetails = matchingVehicleData.vehicleDetails;
                    obj1.nomineeDetails = matchingNomineeDetails.nomineeDetails;
                }
            });
            res.status(200).json({
                status: '1',
                message: 'Customer processed successfully',
                data: customerDetails
            })
        } else {
            res.status(200).json({
                status: '0',
                message: 'Customer processed unSuccessfully',
                data: []
            })
        }

    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Customer processed unSuccessfully',
            data: []
        })
    }
}

const singleCustomerDetails = async (req, res, next) => {
    try {
        if (!req.params.id) {
            return res.status(200).json({
                status: '0',
                message: 'Customer Id missing',
            })
        }
        const customerDetails = await customerModel.findById({ _id: req.params.id }).lean();
        if (customerDetails) {
            const customerVehicleDetails = await customerVehicleModel.find({ customerId: customerDetails.customerId }).lean();
            customerVehicleDetails.map(el => {
                customerDetails.vehicleDetails = el.vehicleDetails
            })
            const productSlaesDetails = await customerNomineeModel.find({ customerId: customerDetails.customerId }).lean();
            productSlaesDetails.map(el => {
                customerDetails.nomineeDetails = el.nomineeDetails
            })
            res.status(200).json({
                status: '1',
                message: 'Customer processed successfully',
                data: customerDetails
            })
        } else {
            res.status(200).json({
                status: '0',
                message: 'Customer processed unSuccessfully',
                data: null
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Customer processed unSuccessfully'
        })
    }
}


const updatedCustomerDetails = async (req, res, next) => {
    try {
        if (!req.params.id) {
            return res.status(200).json({
                status: '0',
                message: 'Customer Id missing',
            })
        }
        const productDetials = await customerModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec();
        if (productDetials) {
            if (req.body.vehicleDetails.length !== 0) {
                req.body.customerId = req.body.customerId
                customerVehicleControllers.updatedCustomerVehicleDetails(req, res, next)
            } else {
                res.status(200).json({
                    status: '1',
                    message: 'Customer updated successfully',
                })
            }
        } else {
            res.status(200).json({
                status: '0',
                message: 'Customer updated unSuccessfully'
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Customer updated unSuccessfully'
        })
    }
}

module.exports = {
    createCustomer: createCustomer,
    getAllCustomerDetails: getAllCustomerDetails,
    singleCustomerDetails: singleCustomerDetails,
    updatedCustomerDetails: updatedCustomerDetails
}