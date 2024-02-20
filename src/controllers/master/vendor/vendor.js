'use-strict';
const express = require('express');
const router = express.Router();

const vendorModel = require('../../../models/master/vendor/vendor')
const financialModel = require('../../../models/master/vendor/vendorFinancial')
const vendorFinancialControlls = require('./vendorFinancial')

const createVendor = async (req, res, next) => {
    try {
        req.body.isLock = false;
        req.body.isActive = 'O';
        const createVendorMaster = await new vendorModel(req.body);
        const result = createVendorMaster.save()
        if (result) {
            if (req.body.financialData.length !== 0) {
                req.body.vendorId = req.body.vendorId
                vendorFinancialControlls.createVendorFinancial(req, res, next)

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
            message: 'Vendor Created unSuccessfully'
        })
    }
}

const getAllVendorDetails = async (req, res, next) => {
    try {
        const vendorDetails = await vendorModel.find({ isActive: 'O' }).sort('-1').lean();

        if (vendorDetails) {
            const vendorFinancialDetails = await financialModel.find({}).sort('-1').lean();
            vendorDetails.forEach((obj1) => {
                const matchFinancialData = vendorFinancialDetails.find((obj2) => obj2.vendorId === obj1.vendorId);
                if (matchFinancialData) {
                    return obj1.financialData = matchFinancialData.financialData;
                }
            });
            res.status(200).json({
                status: '1',
                message: 'vendor processed successfully',
                data: vendorDetails
            })
        } else {
            res.status(200).json({
                status: '0',
                message: 'vendor processed unSuccessfully',
                data: []
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'vendor processed unSuccessfully',
            data: []
        })
    }
}



const singleVendorDetails = async (req, res, next) => {
    try {
        if (!req.params.id) {
            return res.status(200).json({
                status: '0',
                message: 'Vendor Id missing',
            })
        }
        const vendorDetails = await vendorModel.findById({ _id: req.params.id }).lean();
        if (vendorDetails) {
            const vendorFinancialDetails = await financialModel.find({ vendorId: vendorDetails.vendorId }).sort('-1').lean();
            vendorFinancialDetails.map((el) => {
                vendorDetails.financialData = el.financialData
            })
            res.status(200).json({
                status: '1',
                message: 'Vendor processed successfully',
                data: vendorDetails
            })
        } else {
            res.status(200).json({
                status: '0',
                message: 'Vendor processed unSuccessfully'
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Vendor processed unSuccessfully'
        })
    }
}


const updatedVendorDetails = async (req, res, next) => {
    try {
        if (!req.params.id) {
            return res.status(200).json({
                status: '0',
                message: 'Vendor Id missing',
            })
        }
        const vendorDetials = await vendorModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec();
        if (vendorDetials) {
            if (req.body.financialData.length !== 0) {
                req.body.vendorId = req.body.vendorId
                vendorFinancialControlls.updatedVendorFinancialDetails(req, res, next)
            } else {
                res.status(200).json({
                    status: '1',
                    message: 'Vendor updated successfully',
                })
            }

        } else {
            res.status(200).json({
                status: '0',
                message: 'Vendor updated unSuccessfully'
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Vendor updated unSuccessfully'
        })
    }
}


// Pagination API
const getAllVendorDetailsPage = async (req, res, next) => {
    try {
        const financialDataCount = await vendorModel.find({ isActive: 'O' }).count();
        const VendorDetails = await vendorModel.find({ isActive: 'O' }).skip(req.params.skip).limit(req.params.limit).sort('-1').lean();

        if (VendorDetails) {
            const VendorItemdetails = await financialModel.find({}).sort('-1').lean();

            VendorDetails.forEach((obj1) => {
                const matchingFinancialDetails = VendorItemdetails.find((obj2) => obj2.vendorId === obj1.vendorId.toString());
                if ( matchingFinancialDetails) {
                    obj1.financialData = matchingFinancialDetails.financialData;
                }
            });
            res.status(200).json({
                status: '1',
                message: 'Purchase Order processed successfully',
                data: VendorDetails,
                count: financialDataCount
            })
        } else {
            res.status(200).json({
                status: '0',
                message: 'Purchase Order processed unSuccessfully',
                data: []
            })
        }
    } catch (error) {
        console.log(error);
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Vendor  processed unSuccessfully',
            data: []
        })
    }
}




const updatedManyVendorDetails = async (req, res, next) => {
    try {
        const bulkUpdateOps = req.body.map(record => ({
            updateOne: {
                filter: { _id: record._id },
                update: { $set: record },
            },
        }));

        const result = await vendorModel.bulkWrite(bulkUpdateOps);
        if (result) {
            res.status(200).json({
                status: '1',
                message: 'Vendor updated successfully',
            })
        } else {
            res.status(200).json({
                status: '0',
                message: 'Vendor updated unSuccessfully'
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Vendor updated unSuccessfully'
        })
    }
}


module.exports = {
    createVendor: createVendor,
    getAllVendorDetails: getAllVendorDetails,
    singleVendorDetails: singleVendorDetails,
    updatedVendorDetails: updatedVendorDetails,
    getAllVendorDetailsPage:getAllVendorDetailsPage,
    updatedManyVendorDetails:updatedManyVendorDetails
}