'use strict';

const express = require('express');

const vehicleData = require('../../../models/setting/vehicle/vehicleCategory')

const createVehicle = async (req, res, next) => {
    try {
        req.body.isActive = 'O'
        req.body.isLock = false

        const vehicleDataCreated = await new vehicleData(req.body);
        const result = vehicleDataCreated.save()

        if (result) {

            res.status(200).json({
                status: '1',
                message: 'Vehicle Created Successfully'
            })
        } else {
            res.status(200).json({
                status: '0',
                message: 'Vehicle Created unSuccessfully'
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Vehicle Created unSuccessfully'
        })
    }
}

const getAllVehicleDetail = async (req, res, next) => {
    try {
        const vehicleDetail = await vehicleData.find({ isActive: 'O' }).sort('-1').lean();
        if (vehicleDetail) {
            res.status(200).json({
                status: '1',
                message: 'Vehicle processed Successfully',
                data: vehicleDetail,
            })
        }
        else {
            res.status(200).json({
                status: '0',
                message: 'Vehicle processed unSuccessfully',
                data: []
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Vehicle processed unSuccessfully',
            data: []
        })
    }
}

const singleVehicleDetail = async (req, res, next) => {
    try {
        if (!req.params.id) {
            return res.status(200).json({
                status: '0',
                message: 'Vehicle Id missing',
            })
        }

        const vehicleDetail = await vehicleData.findById({ _id: req.params.id }).lean();
        if (vehicleDetail) {
            res.status(200).json({
                status: '1',
                message: 'Vehicle Processed Succesfully',
                data: vehicleDetail
            })
        }
        else {
            res.status(200).json({
                status: '0',
                message: 'Vehicle processed unSuccessfully'
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Vehicle processed unSuccessfully',
        })
    }
}

const updateVehicleDetail = async (req, res, next) => {
    try {
        if (!req.params.id) {
            return res.status(200).json({
                status: '0',
                message: 'Vehicle Id missing',
            })
        }

        const VehicleDetail = await vehicleData.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec()

        if (VehicleDetail) {
            res.status(200).json({
                status: '1',
                message: 'Vehicle updated successfully',
            })
        } else {
            res.status(200).json({
                status: '0',
                message: 'Vehicle updated unSuccessfully'
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Vehicle processed unSuccessfully',
        })
    }
}

module.exports = {
    createVehicle: createVehicle,
    getAllVehicleDetail: getAllVehicleDetail,
    singleVehicleDetail: singleVehicleDetail,
    updateVehicleDetail:updateVehicleDetail
}