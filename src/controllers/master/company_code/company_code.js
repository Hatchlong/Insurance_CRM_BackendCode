'use strict';

const express = require('express');
const router = express.Router();
const companyCode = require('../../../models/master/company_code/company_code');


const createCompanyCode = async (req, res, next) => {
    try {
        if (!req.body.countryId) {
            return res.status(200).json({
                status: '0',
                message: 'Country Id missing'
            })
        }
        if (!req.body.languageId) {
            return res.status(200).json({
                status: '0',
                message: 'Language Id missing'
            })
        }
        if (!req.body.currencyId) {
            return res.status(200).json({
                status: '0',
                message: 'Currency Id missing'
            })
        }
        req.body.isActive = 'O';
        req.body.companyCode = req.body.companyCode.toUpperCase()

        const findDetails = await companyCode.findOne({ companyCode: req.body.companyCode }).lean();
        if (findDetails) {
            return res.status(200).json({
                status: '0',
                message: 'Company Code is already exist'
            })
        }
        // if (findDetails.isActive === 'C') {
        //     findDetails._id = findDetails._id;
        //     findDetails.isActive = "O";
        //     const CompanyCodeDetails = await companyCode.findByIdAndUpdate({ _id: findDetails._id }, findDetails, { new: true }).exec();
        //     if (CompanyCodeDetails) {
        //         res.status(200).json({
        //             status: '1',
        //             message: 'Company Code Created successfully',
        //         })
        //     } else {
        //         res.status(500).json({
        //             status: '0',
        //             message: 'Company Code Created unSuccessfully'
        //         })
        //     }
        //     return
        // }
        const companyCodeCreated = await new companyCode(req.body);
        const result = companyCodeCreated.save()
        if (result) {

            res.status(200).json({
                status: '1',
                message: 'Company Code Created Successfully'
            })
        } else {
            res.status(200).json({
                status: '0',
                message: 'Company Code Created unSuccessfully'
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Company Code Created unSuccessfully'
        })
    }
}



const getAllCompanyCodeDetails = async (req, res, next) => {
    try {
        const companyCodeDetails = await companyCode.find({ isActive: 'O' }).sort('-1').lean();
        if (companyCodeDetails) {
            res.status(200).json({
                status: '1',
                message: 'Company Code processed successfully',
                data: companyCodeDetails,
            })
        } else {
            res.status(200).json({
                status: '0',
                message: 'Company Code processed unSuccessfully',
                data: []
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Company Code  processed unSuccessfully',
            data: []
        })
    }
}



const singleCompanyCodeDetails = async (req, res, next) => {
    try {
        if (!req.params.id) {
            return res.status(200).json({
                status: '0',
                message: 'Company Code Id missing',
            })
        }
        const CompanyCodeDetails = await companyCode.findById({ _id: req.params.id }).lean();
        if (CompanyCodeDetails) {
            res.status(200).json({
                status: '1',
                message: 'Company Code processed successfully',
                data: CompanyCodeDetails
            })
        } else {
            res.status(200).json({
                status: '0',
                message: 'Company Code processed unSuccessfully'
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Company Code processed unSuccessfully'
        })
    }
}


const updatedCompanyCodeDetails = async (req, res, next) => {
    try {
        if (!req.params.id) {
            return res.status(200).json({
                status: '0',
                message: 'Company Code Id missing',
            })
        }
        const CompanyCodeDetails = await companyCode.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec();
        if (CompanyCodeDetails) {
            res.status(200).json({
                status: '1',
                message: 'Company Code updated successfully',
            })
        } else {
            res.status(200).json({
                status: '0',
                message: 'Company Code updated unSuccessfully'
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Company Code updated unSuccessfully'
        })
    }
}



module.exports = {
    createCompanyCode: createCompanyCode,
    getAllCompanyCodeDetails: getAllCompanyCodeDetails,
    singleCompanyCodeDetails: singleCompanyCodeDetails,
    updatedCompanyCodeDetails: updatedCompanyCodeDetails,
}