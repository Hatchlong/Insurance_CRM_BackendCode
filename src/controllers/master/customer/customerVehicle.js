'use strict';

const express = require('express');
const router = express.Router();
const customerVehicleModel = require('../../../models/master/customer/customerVehicle');
const customerNomineeControllers = require('./customerNominee');


const createCustomerVehicleDetails = async (req, res, next) => {
    try {
        const requestBody = {
            customerId: req.body.customerId,
            vehicleDetails: req.body.vehicleDetails
        }
        const customerVehicleCreated = await new customerVehicleModel(requestBody);
        const result = customerVehicleCreated.save()
        if (result) {
            if (req.body.nomineeDetails.length !== 0) {
                req.body.customerId = req.body.customerId
                customerNomineeControllers.createCustomerNomineeDetails(req, res, next)
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
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Customer Created unSuccessfully'
        })
    }
}



const updatedCustomerVehicleDetails = async (req, res, next) => {
    try {
        if (!req.body.customerId) {
            return res.status(200).json({
                status: '0',
                message: 'Customer Id missing',
            })
        }
        const findDetails = await customerVehicleModel.findOne({ customerId: req.body.customerId }).lean();
        if (findDetails) {
            const requestBody = {
                customerId: req.body.customerId,
                vehicleDetails: req.body.vehicleDetails
            }
            const customerVehicleDetails = await customerVehicleModel.findByIdAndUpdate({ _id: findDetails._id.toString() }, requestBody, { new: true }).exec();
            if (customerVehicleDetails) {
                if (req.body.nomineeDetails.length !== 0) {
                    req.body.customerId = req.body.customerId
                    customerNomineeControllers.updatedCustomerNomineeDetails(req, res, next)
                } else {
                    res.status(200).json({
                        status: '1',
                        message: 'Customer updated successfully',
                    })
                }

            } else {
                res.status(500).json({
                    status: '0',
                    message: 'Customer updated unSuccessfully'
                })
            }
        } else {
            const requestBody = {
                customerId: req.body.customerId,
                vehicleDetails: req.body.vehicleDetails
            }
            const customerVehicleCreated = await new customerVehicleModel(requestBody);
            const result = customerVehicleCreated.save()
            if (result) {
                if (req.body.nomineeDetails.length !== 0) {
                    req.body.customerId = req.body.customerId
                    customerNomineeControllers.updatedProductSalesDetails(req, res, next)
                } else {
                    res.status(200).json({
                        status: '1',
                        message: 'Customer updated Successfully'
                    })
                }
            } else {
                res.status(500).json({
                    status: '0',
                    message: 'Customer updated unSuccessfully'
                })
            }

        }

    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Customer updated unSuccessfully'
        })
    }
}



const createCustomerVehicleDetailsMany = async (req, res, next) => {
    try {
        const reqBody = [];
        const vehicleDataArray = []
        const data = req.reqPlantData;
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].vehicleDetails.length; j++) {

                data[i].vehicleDetails[j].isLock = false;
                data[i].vehicleDetails[j].isActive = 'O';
                
                var changeValue = await areArraysEqual(data[i].vehicleDetails[j], i,j, req, res, next);
                if (changeValue) {
                    vehicleDataArray.push(changeValue)
                }
            }

        }
        vehicleDataArray.map((el, i) => {
            const reqdata = {
                customerId: el.customerId,
                vehicleDetails: vehicleDataArray.filter((el) => el.customerId === vehicleDataArray[i].customerId)
            };
            const findDetails = reqBody.find((el) => el.customerId === reqdata.customerId);
            if (!findDetails) {
                reqBody.push(reqdata)
            }
        })
        if (reqBody.length !== data.length) {
            return
        }
        reqBody.map((el) => {
            el.vehicleDetails.map((ele) => {
                delete ele.customerId
            })
        })
        const reqBodyDetails = {
            reqPlantData:reqBody,
            reqSalesData: req.reqSalesData,
            reqProduct: req.reqProduct
        }

        if (req.reqSalesData.length !== 0) {
            customerNomineeControllers.createCustomerSalesDetailsMany(reqBodyDetails, res, next)
        } else {
            const customerVehicleCreated = await customerVehicleModel.create(reqBody);
            if (customerVehicleCreated) {
                res.status(200).json({
                    status: '1',
                    message: 'Customer Created Successfully'
                })
            } else {
                res.status(200).json({
                    status: '1',
                    message: 'Customer Created unSuccessfully'
                })
            }
        }
    } catch (error) {
        console.error(error)
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Customer Created unSuccessfully'
        })
    }
}



module.exports = {
    createCustomerVehicleDetails: createCustomerVehicleDetails,
    updatedCustomerVehicleDetails: updatedCustomerVehicleDetails,
    createCustomerVehicleDetailsMany: createCustomerVehicleDetailsMany
}