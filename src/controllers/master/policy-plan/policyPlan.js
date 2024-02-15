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

module.exports = {
    createPolicyPlan: createPolicyPlan,
    getAllPolicyPlan: getAllPolicyPlan,
    singlePolicyPlanDetail: singlePolicyPlanDetail,
    updatePolicyPlanDetail: updatePolicyPlanDetail

}