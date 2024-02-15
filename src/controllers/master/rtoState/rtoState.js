'use strict';

const express = require('express');

const rtoStateData = require('../../../models/setting/rtoState/rtoState')

const createRtoState = async (req, res, next) => {
    try {
        req.body.isActive = 'O'
        const rtoStateDataCreated = await new rtoStateData(req.body);
        const result = rtoStateDataCreated.save()
        if (result) {
            res.status(200).json({
                status: '1',
                message: 'RTO State Created Successfully'
            })
        } else {
            res.status(200).json({
                status: '0',
                message: 'RTO State Created unSuccessfully'
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'RTO State Created unSuccessfully'
        })
    }
}

const getAllRtoStateDetail = async (req, res, next) => {
    try {
        const rtoStateDetail = await rtoStateData.find({ isActive: 'O' }).sort('-1').lean();
        if (rtoStateDetail) {
            res.status(200).json({
                status: '1',
                message: 'RTO State processed Successfully',
                data: rtoStateDetail,
            })
        }
        else {
            res.status(200).json({
                status: '0',
                message: 'RTO State processed unSuccessfully',
                data: []
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'RTO State processed unSuccessfully',
            data: []
        })
    }
}

const singleRtoStateDetail = async (req, res, next) => {
    try {
        if (!req.params.id) {
            return res.status(200).json({
                status: '0',
                message: 'Agent Id missing',
            })
        }

        const rtoStateDetail = await rtoStateData.findById({ _id: req.params.id }).lean();
        if (rtoStateDetail) {
            res.status(200).json({
                status: '1',
                message: 'RTO State Processed Succesfully',
                data: rtoStateDetail
            })
        }
        else {
            res.status(200).json({
                status: '0',
                message: 'RTO State processed unSuccessfully'
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'RTO State processed unSuccessfully',
        })
    }
}

const updateRtoStateDetail = async (req, res, next) => {
    try {
        if (!req.params.id) {
            return res.status(200).json({
                status: '0',
                message: 'RTO State Id missing',
            })
        }
        const RtoStateDetail = await rtoStateData.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec()
        if (RtoStateDetail) {
            res.status(200).json({
                status: '1',
                message: 'RTO State updated successfully',
            })
        } else {
            res.status(200).json({
                status: '0',
                message: 'RTO State updated unSuccessfully'
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'RTO State processed unSuccessfully',
        })
    }
}

module.exports = {
    createRtoState: createRtoState,
    getAllRtoStateDetail: getAllRtoStateDetail,
    singleRtoStateDetail: singleRtoStateDetail,
    updateRtoStateDetail:updateRtoStateDetail
}