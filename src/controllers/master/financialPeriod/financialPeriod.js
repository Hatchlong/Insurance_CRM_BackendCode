'use strict';

const express = require('express');
const financialPeriodData = require('../../../models/master/financialPeriod/financialPeriod')

const multer = require('multer');
const XLSX = require('xlsx');
const util = require('util');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const multerUpload = util.promisify(upload.single('file'));



const createFinancial = async (req, res, next) => {
    try {
        req.body.isActive = 'O'

        const financialPeriodDataCreated = await new financialPeriodData(req.body);
        const result = financialPeriodDataCreated.save()

        if (result) {

            res.status(200).json({
                status: '1',
                message: 'Financial Period Created Successfully'
            })
        } else {
            res.status(200).json({
                status: '0',
                message: 'Financial Period Created unSuccessfully'
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Financial Period Created unSuccessfully'
        })
    }
}

const getAllFinancialDetail = async (req, res, next) => {
    try {
        const financialDetail = await financialPeriodData.find({ isActive: 'O' }).sort('-1').lean();
        if (financialDetail) {
            res.status(200).json({
                status: '1',
                message: 'Financial Period processed Successfully',
                data: financialDetail,
            })
        }
        else {
            res.status(200).json({
                status: '0',
                message: 'Financial Period processed unSuccessfully',
                data: []
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Financial Period processed unSuccessfully',
            data: []
        })
    }
}

const singleFinancialDetail = async (req, res, next) => {
    try {
        if (!req.params.id) {
            return res.status(200).json({
                status: '0',
                message: 'Financial Period Id missing',
            })
        }

        const financialDetail = await financialPeriodData.findById({ _id: req.params.id }).lean();
        if (financialDetail) {
            res.status(200).json({
                status: '1',
                message: 'Financial Period Processed Succesfully',
                data: financialDetail
            })
        }
        else {
            res.status(200).json({
                status: '0',
                message: 'Financial Period processed unSuccessfully'
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Financial Period processed unSuccessfully',
        })
    }
}

const updateFinancialDetail = async (req, res, next) => {
    try {
        if (!req.params.id) {
            return res.status(200).json({
                status: '0',
                message: 'Financial Period Id missing',
            })
        }

        const FinancialDetail = await financialPeriodData.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec()

        if (FinancialDetail) {
            res.status(200).json({
                status: '1',
                message: 'Financial Period updated successfully',
            })
        } else {
            res.status(200).json({
                status: '0',
                message: 'Financial Period updated unSuccessfully'
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Financial Period processed unSuccessfully',
        })
    }
}

module.exports = {
    createFinancial: createFinancial,
    getAllFinancialDetail: getAllFinancialDetail,
    singleFinancialDetail: singleFinancialDetail,
    updateFinancialDetail:updateFinancialDetail,
   
}