'use strict';

const express = require('express');
const router = express.Router();

const financialModel = require('../../../models/master/vendor/vendorFinancial');

const vendorModel = require('../../../models/master/vendor/vendor');

const createVendorFinancial = async (req, res, next) => {

    try {
        const requestBody = {
            vendorId: req.body.vendorId,
            financialData: req.body.financialData
        }
        const financialCreated = await new financialModel(requestBody);
        const result = financialCreated.save()
        if (result) {
            res.status(200).json({
                status: '1',
                message: 'Vendor Created Successfully'
            })
        } else {
            res.status(500).json({
                status: '0',
                message: 'Vendor Created unSuccessfully'
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Vendor Created unSuccessfully'
        })
    }
}

const updatedVendorFinancialDetails = async (req, res, next) => {
    try {
        if (!req.body.vendorId) {
            return res.status(200).json({
                status: '0',
                message: 'Vendor Id missing',
            })
        }
        const findDetails = await financialModel.findOne({ vendorId: req.body.vendorId }).lean();
        if (findDetails) {
            const requestBody = {
                vendorId: req.body.vendorId,
                financialData: req.body.financialData
            }
            const vendorDetials = await financialModel.findByIdAndUpdate({ _id: findDetails._id.toString() }, requestBody, { new: true }).exec();
            if (vendorDetials) {
                res.status(200).json({
                    status: '1',
                    message: 'Vendor updated successfully',
                })
            } else {
                res.status(500).json({
                    status: '0',
                    message: 'Vendor updated unSuccessfully'
                })
            }
        } else {
            const requestBody = {
                vendorId: req.body.vendorId,
                financialData: req.body.financialData
            }
            const financialCreated = await new financialModel(requestBody);
            const result = financialCreated.save()
            if (result) {
                res.status(200).json({
                    status: '1',
                    message: 'Vendor updated Successfully'
                })
            } else {
                res.status(500).json({
                    status: '0',
                    message: 'Vendor updated unSuccessfully'
                })
            }
        }

    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Vendor updated unSuccessfully'
        })
    }
}



const createFinancialDetailsMany = async (req, res, next) => {
    try {
        const reqBody = [];
        const financialDataArray = []
        const data = req.reqFinancialData;
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].financialData.length; j++) {
                data[i].financialData[j].isLock = false;
                data[i].financialData[j].isActive = 'O';
                
                var changeValue = await areArraysEqual(data[i].financialData[j], req, res, next);
                if (changeValue) {
                    financialDataArray.push(changeValue)
                }
            }

        }
        financialDataArray.map((el, i) => {
            const reqdata = {
                vendorId: el.vendorId,
                financialData: financialDataArray.filter((el) => el.vendorId === financialDataArray[i].vendorId)
            };
            const findDetails = reqBody.find((ele) => el.vendorId === ele.vendorId);
            if (!findDetails) {
                reqBody.push(reqdata)
            }
        })
        console.log(reqBody.length , data.length)
        if (reqBody.length !== data.length) {
            return
        }
        reqBody.map((el) => {
            el.financialData.map((ele) => {
                delete ele.vendorId
            })
        })

        const createdVendorRecords = await vendorModel.create(req.reqVendor);
        const createdFinancialRecords = await financialModel.create(reqBody);
        if (createdVendorRecords && createdFinancialRecords ) {
            res.status(200).json({
                status: '1',
                message: 'Vendor Created Successfully'
            })
        } else {
            res.status(200).json({
                status: '0',
                message: 'Vendor Created unSuccessfully'
            })
        }
    } catch (error) {
        console.error(error)
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Product Created unSuccessfully'
        })
    }
}



module.exports={
    createVendorFinancial:createVendorFinancial,
    updatedVendorFinancialDetails:updatedVendorFinancialDetails,
    createFinancialDetailsMany:createFinancialDetailsMany
}
