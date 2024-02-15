'use strict';

const express = require('express');
const router = express.Router();

const customerNomineeModel = require('../../../models/master/customer/customerNominee');
const customerModel=require('../../../models/master/customer/customer')
const customerVehicleModel=require('../../../models/master/customer/customerVehicle')

const createCustomerNomineeDetails = async (req, res, next) => {
    try {
        const requestBody = {
            customerId: req.body.customerId,
            nomineeDetails: req.body.nomineeDetails
        }
        const customerNomineeCreated = await new customerNomineeModel(requestBody);
        const result = customerNomineeCreated.save()
        if (result) {
            res.status(200).json({
                status: '1',
                message: 'Customer Created Successfully'
            })
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



const updatedCustomerNomineeDetails = async (req, res, next) => {
    try {
        if (!req.body.customerId) {
            return res.status(200).json({
                status: '0',
                message: 'Customer Id missing',
            })
        }
        const findDetails = await customerNomineeModel.findOne({ customerId: req.body.customerId }).lean();
        if (findDetails) {
            const requestBody = {
                customerId: req.body.customerId,
                nomineeDetails: req.body.nomineeDetails
            }
            const customerNomineeDetails = await customerNomineeModel.findByIdAndUpdate({ _id: findDetails._id.toString() }, requestBody, { new: true }).exec();
            if (customerNomineeDetails) {
                res.status(200).json({
                    status: '1',
                    message: 'Customer updated successfully',
                })
            } else {
                res.status(500).json({
                    status: '0',
                    message: 'Customer updated unSuccessfully'
                })
            }
        } else {
            const requestBody = {
                customerId: req.body.customerId,
                nomineeDetails: req.body.nomineeDetails
            }
            const customerNomineeCreated = await new customerNomineeModel(requestBody);
            const result = customerNomineeCreated.save()
            if (result) {
                res.status(200).json({
                    status: '1',
                    message: 'Customer updated Successfully'
                })
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


const createCustomerNomineeDetailsMany = async (req, res, next) => {
    try {
        const reqBody = [];
        const nomineeDataArray = []
        const data = req.reqnomineeDetails;
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].nomineeDetails.length; j++) {
                data[i].nomineeDetails[j].isLock = false;
                data[i].nomineeDetails[j].isActive = 'O';
              
                var changeValue = await areArraysEqual(data[i].nomineeDetails[j], req, res, next);
                if (changeValue) {
                    nomineeDataArray.push(changeValue)
                }
            }

        }
        nomineeDataArray.map((el, i) => {
            const reqdata = {
                customerId: el.customerId,
                nomineeDetails: nomineeDataArray.filter((el) => el.customerId === nomineeDataArray[i].customerId)
            }
            const findDetails = reqBody.find((el) => el.customerId === reqdata.customerId);
            console.log(findDetails, 'jj')
            if (!findDetails) {
                reqBody.push(reqdata)
            }
        })
        if (reqBody.length !== data.length) {
            return
        }
        reqBody.map((el) => {
            el.nomineeDetails.map((ele) => {
                delete ele.customerId
            })
        })
        const customerCreated = await customerModel.create(req.reqProduct);
        const customerVehicleCreated = await customerVehicleModel.create(req.reqPlantData);
        const customerNomineeCreated = await customerNomineeModel.create(reqBody);

        if (customerNomineeCreated && customerCreated && customerVehicleCreated) {
            res.status(200).json({
                status: '1',
                message: 'Customer Created Successfully'
            })
        } else {
            res.status(200).json({
                status: '0',
                message: 'Customer Created unSuccessfully'
            })
        }
    } catch (error) {
        console.log(error);
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Customer Created unSuccessfully'
        })
    }
}


module.exports = {
    createCustomerNomineeDetails: createCustomerNomineeDetails,
    updatedCustomerNomineeDetails: updatedCustomerNomineeDetails,
    createCustomerNomineeDetailsMany: createCustomerNomineeDetailsMany
}