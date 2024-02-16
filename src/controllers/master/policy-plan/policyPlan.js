'use strict';

const express = require('express');

const policyPlanData = require('../../../models/master/agent/policy-plan/policy-plan');

const createPolicyPlan = async (req, res, next) => {
    try {
        req.body.isActive = 'O'
        req.body.isLock = false;

        const policyPlan = await new policyPlanData(req.body)
        const result = policyPlan.save()

        if (result) {

            res.status(200).json({
                status: '1',
                message: 'Policy Plan Created Successfully'
            })
        } else {
            res.status(200).json({
                status: '0',
                message: 'Policy Plan Created unSuccessfully'
            })
        }

    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Policy Plan Created unSuccessfully'
        })
    }
}

const getAllPolicyPlan = async (req, res, next) => {
    try {
        const policydetail = await policyPlanData.find({ isActive: 'O' }).sort('-1').lean();

        if (policydetail) {
            res.status(200).json({
                status: '1',
                message: 'Policy Plan Processed Successfully',
                data: policydetail
            })
        }
        else {
            res.status(200).json({
                status: '0',
                message: 'Policy Plan processed unSuccessfully',
                data: []
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Policy Plan Processed unSuccessfully',
            data: []
        })
    }
}

const singlePolicyPlanDetail = async (req, res, next) => {
    try {
        if (!req.params.id) {
            return res.status(200).json({
                status: '0',
                message: 'Policy Plan Id is missing'
            })
        }

        const policydetail = await policyPlanData.findById({ _id: req.params.id }).lean()

        if (policydetail) {
            res.status(200).json({
                status: '1',
                message: 'Policy Plan Processed Successfully',
                data: policydetail
            })
        }
        else {
            res.status(200).json({
                status: '0',
                message: 'Policy Plan Processed unSuccessfully'
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Policy Plan Processed unSuccessfully'
        })
    }
}

const updatePolicyPlanDetail = async (req, res, next) => {
    try {

        if (!req.params.id) {
            return res.status(200).json({
                status: '0',
                message: 'Policy Plan Id is missing'
            })
        }

        const policyPlanDetail = await policyPlanData.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec()
        if (policyPlanDetail) {
            res.status(200).json({
                status: '1',
                message: 'Policy Plan Updated Successfully'
            })
        } else {
            res.status(200).json({
                status: '0',
                message: 'Policy Plan Updated unSuccessfully'
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Policy Plan Updated unSuccessfully'
        })
    }
}

// Pagination API
const getAllpolicyPlanDetailsPage = async (req, res, next) => {
    try {
        const policyPlanCount = await policyPlanData.find({ isActive: 'O' }).count();
        const policyPlanDetails = await policyPlanData.find({ isActive: 'O' }).skip(req.params.skip).limit(req.params.limit).sort('-1').lean();
        if (policyPlanDetails) {
            res.status(200).json({
                status: '1',
                message: 'Policy Plan processed successfully',
                data: policyPlanDetails,
                count:policyPlanCount
            })
        } else {
            res.status(200).json({
                status: '0',
                message: 'Policy Plan processed unSuccessfully',
                data: []
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Policy Plan  processed unSuccessfully',
            data: []
        })
    }
}




const updatedManyPolicyPlanDetails = async (req, res, next) => {
    try {

        const bulkUpdateOps = req.body.map(record => ({
            updateOne: {
                filter: { _id: record._id },
                update: { $set: record },
            },
        }));

        const result = await policyPlanData.bulkWrite(bulkUpdateOps);
        if (result) {
            res.status(200).json({
                status: '1',
                message: 'Policy Plan updated successfully',
            })
        } else {
            res.status(200).json({
                status: '0',
                message: 'Policy Plan updated unSuccessfully'
            })
        }
    } catch (error) {
        console.log(error)
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Policy Plan updated unSuccessfully'
        })
    }
}


module.exports = {
    createPolicyPlan: createPolicyPlan,
    getAllPolicyPlan: getAllPolicyPlan,
    singlePolicyPlanDetail: singlePolicyPlanDetail,
    updatePolicyPlanDetail: updatePolicyPlanDetail,
    getAllpolicyPlanDetailsPage:getAllpolicyPlanDetailsPage,
    updatedManyPolicyPlanDetails:updatedManyPolicyPlanDetails

}