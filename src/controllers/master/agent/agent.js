'use strict';

const express = require('express');
const agentData = require('../../../models/master/agent/agent')

const multer = require('multer');
const XLSX = require('xlsx');
const util = require('util');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const multerUpload = util.promisify(upload.single('file'));



const createAgent = async (req, res, next) => {
    try {
        req.body.isActive = 'O'

        const agentDataCreated = await new agentData(req.body);
        const result = agentDataCreated.save()

        if (result) {

            res.status(200).json({
                status: '1',
                message: 'Agent Created Successfully'
            })
        } else {
            res.status(200).json({
                status: '0',
                message: 'Agent Created unSuccessfully'
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Agent Created unSuccessfully'
        })
    }
}

const getAllAgentDetail = async (req, res, next) => {
    try {
        const agentDetail = await agentData.find({ isActive: 'O' }).sort('-1').lean();
        if (agentDetail) {
            res.status(200).json({
                status: '1',
                message: 'Agent processed Successfully',
                data: agentDetail,
            })
        }
        else {
            res.status(200).json({
                status: '0',
                message: 'Agent processed unSuccessfully',
                data: []
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Agent processed unSuccessfully',
            data: []
        })
    }
}

const singleAgentDetail = async (req, res, next) => {
    try {
        if (!req.params.id) {
            return res.status(200).json({
                status: '0',
                message: 'Agent Id missing',
            })
        }

        const agentDetail = await agentData.findById({ _id: req.params.id }).lean();
        if (agentDetail) {
            res.status(200).json({
                status: '1',
                message: 'Agent Processed Succesfully',
                data: agentDetail
            })
        }
        else {
            res.status(200).json({
                status: '0',
                message: 'Agent processed unSuccessfully'
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Agent processed unSuccessfully',
        })
    }
}

const updateAgentDetail = async (req, res, next) => {
    try {
        if (!req.params.id) {
            return res.status(200).json({
                status: '0',
                message: 'Agent Id missing',
            })
        }

        const AgentDetail = await agentData.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec()

        if (AgentDetail) {
            res.status(200).json({
                status: '1',
                message: 'Agent updated successfully',
            })
        } else {
            res.status(200).json({
                status: '0',
                message: 'Agent updated unSuccessfully'
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Agent processed unSuccessfully',
        })
    }
}


// Pagination API
const getAllInventoryDetailsPage = async (req, res, next) => {
    try {
        const agentCount = await agentData.find({ isActive: 'O' }).count();
        const inventoryDetails = await agentData.find({ isActive: 'O' }).skip(req.params.skip).limit(req.params.limit).sort('-1').lean();
        if (inventoryDetails) {
            res.status(200).json({
                status: '1',
                message: 'Agent processed successfully',
                data: inventoryDetails,
                count: agentCount
            })
        } else {
            res.status(200).json({
                status: '0',
                message: 'Agent processed unSuccessfully',
                data: []
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Agent  processed unSuccessfully',
            data: []
        })
    }
}


const updatedManyInventoryDetails = async (req, res, next) => {
    try {

        const bulkUpdateOps = req.body.map(record => ({
            updateOne: {
                filter: { _id: record._id },
                update: { $set: record },
            },
        }));

        const result = await agentData.bulkWrite(bulkUpdateOps);
        if (result) {
            res.status(200).json({
                status: '1',
                message: 'Agent updated successfully',
            })
        } else {
            res.status(200).json({
                status: '0',
                message: 'Agent updated unSuccessfully'
            })
        }
    } catch (error) {
        console.log(error)
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Agent updated unSuccessfully'
        })
    }
}


module.exports = {
    createAgent: createAgent,
    getAllAgentDetail: getAllAgentDetail,
    singleAgentDetail: singleAgentDetail,
    updateAgentDetail:updateAgentDetail,
    getAllInventoryDetailsPage:getAllInventoryDetailsPage,
    updatedManyInventoryDetails:updatedManyInventoryDetails
}