'use strict';

const express = require('express');

const companyCodeData = require('../../../models/setting/conpanyCode/companyCode')

const createCompanyCode = async (req, res, next) => {
    try {
        req.body.isActive = 'O'
        req.body.isLock = false
        const companyCodeDataCreated = await new companyCodeData(req.body);
        const result = companyCodeDataCreated.save()

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

const getAllCompanyCodeDetail = async (req, res, next) => {
    try {
        const companyCodeDetail = await companyCodeData.find({ isActive: 'O' }).sort('-1').lean();
        if (companyCodeDetail) {
            res.status(200).json({
                status: '1',
                message: 'Company Code processed Successfully',
                data: companyCodeDetail,
            })
        }
        else {
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
            message: 'Company Code processed unSuccessfully',
            data: []
        })
    }
}

const singleCompanyCodeDetail = async (req, res, next) => {
    try {
        if (!req.params.id) {
            return res.status(200).json({
                status: '0',
                message: 'Company Code Id missing',
            })
        }

        const companyCodeDetail = await companyCodeData.findById({ _id: req.params.id }).lean();
        if (companyCodeDetail) {
            res.status(200).json({
                status: '1',
                message: 'Company Code Processed Succesfully',
                data: companyCodeDetail
            })
        }
        else {
            res.status(200).json({
                status: '0',
                message: 'Company Code processed unSuccessfully'
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Company Code processed unSuccessfully',
        })
    }
}

const updateCompanyCodeDetail = async (req, res, next) => {
    try {
        if (!req.params.id) {
            return res.status(200).json({
                status: '0',
                message: 'Company Code Id missing',
            })
        }

        const CompanyCodeDetail = await companyCodeData.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec()

        if (CompanyCodeDetail) {
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
            message: 'Company Code processed unSuccessfully',
        })
    }
}

module.exports = {
    createCompanyCode: createCompanyCode,
    getAllCompanyCodeDetail: getAllCompanyCodeDetail,
    singleCompanyCodeDetail: singleCompanyCodeDetail,
    updateCompanyCodeDetail: updateCompanyCodeDetail
}