'use strict';

const express = require('express')

const applyPolicyModel = require('../../models/master/agent/apply-policy/applyPolicy')

const createApplyPolicyData = async (req, res, next) => {
    try {
        req.body.isActive = 'O'
        req.body.isLock = false;

        const applyPolicyData = await new applyPolicyModel(req.body)
        const result = applyPolicyData.save()

        if (result) {
            res.status(200).json({
                status: '1',
                message: 'Apply Policy Created successfully'
            })
        }
        else {
            res.status(200).json({
                status: '0',
                message: 'Apply Policy Created Unsuccessfully'
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Apply Policy Created unSuccessfully'
        })
    }
}

const getAllApplyPolicyData = async (req, res, next) => {
    try {

        const applyPolicy = await applyPolicyModel.find({ isActive: 'O' }).sort('-1').lean();

        if (applyPolicy) {
            res.status(200).json({
                status: '1',
                message: 'Apply Policy Processed successfully',
                data: applyPolicy
            })
        }
        else {
            res.status(200).json({
                status: '1',
                message: 'Apply Policy Processed Unsuccessfully',
                data: []
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Apply Policy Processed Unsuccessfully',
            data: []
        })
    }
}

const singleApplyPolicydetail = async (req, res, next) => {
    try {
        if (!req.params.id) {
            return res.status(200).json({
                status: '0',
                message: 'Apply Policy Id is missing'
            })
        }

        const applypolicydetail = await applyPolicyModel.findById({ _id: req.params.id }).lean()

        if (applypolicydetail) {
            res.status(200).json({
                status: '1',
                message: 'Apply Policy Processed Successfully',
                data: applypolicydetail
            })
        }
        else {
            res.status(200).json({
                status: '0',
                message: 'Apply Policy Processed unSuccessfully'
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Apply Policy Processed Unsuccessfully',
        })
    }
}

const updateApplyPolicyDetail = async (req, res, next) => {
    try {

        if (!req.params.id) {
            return res.status(200).json({
                status: '0',
                message: 'Apply Policy Id is missing'
            })
        }

        const applyPolicyDetail = await applyPolicyModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec()

        if (applyPolicyDetail) {
            res.status(200).json({
                status: '1',
                message: 'Apply Policy Updated Successfully'
            })
        } else {
            res.status(200).json({
                status: '0',
                message: 'Apply Policy Updated unSuccessfully'
            })
        }

    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Apply Policy Updated Unsuccessfully'
        })
    }
}

// Pagination API
const getAllappPolicyDetailsPage = async (req, res, next) => {
    try {
        const appPolicyCount = await applyPolicyModel.find({ isActive: 'O' }).count();
        const appPolicyDetails = await applyPolicyModel.find({ isActive: 'O' }).skip(req.params.skip).limit(req.params.limit).sort('-1').lean();
        if (appPolicyDetails) {
            res.status(200).json({
                status: '1',
                message: 'Vehicle Category processed successfully',
                data: appPolicyDetails,
                count:appPolicyCount
            })
        } else {
            res.status(200).json({
                status: '0',
                message: 'Vehicle Category processed unSuccessfully',
                data: []
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Vehicle Category  processed unSuccessfully',
            data: []
        })
    }
}




const updatedManyApplyPolicyDetails = async (req, res, next) => {
    try {

        const bulkUpdateOps = req.body.map(record => ({
            updateOne: {
                filter: { _id: record._id },
                update: { $set: record },
            },
        }));

        const result = await applyPolicyModel.bulkWrite(bulkUpdateOps);
        if (result) {
            res.status(200).json({
                status: '1',
                message: 'Vehicle Category updated successfully',
            })
        } else {
            res.status(200).json({
                status: '0',
                message: 'Vehicle Category updated unSuccessfully'
            })
        }
    } catch (error) {
        console.log(error)
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Vehicle Category updated unSuccessfully'
        })
    }
}



module.exports = {
    createApplyPolicyData: createApplyPolicyData,
    getAllApplyPolicyData: getAllApplyPolicyData,
    singleApplyPolicydetail: singleApplyPolicydetail,
    updateApplyPolicyDetail: updateApplyPolicyDetail,
    getAllappPolicyDetailsPage:getAllappPolicyDetailsPage,
    updatedManyApplyPolicyDetails:updatedManyApplyPolicyDetails

}