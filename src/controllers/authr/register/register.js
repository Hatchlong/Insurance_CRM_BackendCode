'use strict';

const express = require('express');
const router = express.Router();
const registerModel = require('../../../models/authr/register/register');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const createUserDetails = async (req, res, next) => {
    try {
        if (!req.body.userName) {
            return res.status(200).json({
                status: '0',
                message: 'User Name is missing'
            })
        }
        if (!req.body.password) {
            return res.status(200).json({
                status: '0',
                message: 'Password is missing'
            })
        }
        if (!req.body.emailId) {
            return res.status(200).json({
                status: '0',
                message: 'EmailId is missing'
            })
        }
        const findDetails = await registerModel.findOne({ emailId: req.body.emailId }).lean();
        if (findDetails) {
            return res.status(200).json({
                status: '0',
                message: 'EmailId is already exist'
            })
        }
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;

        const registerCreated = await new registerModel(req.body);
        const result = registerCreated.save()
        if (result) {

            res.status(200).json({
                status: '1',
                message: 'User Created Successfully'
            })
        } else {
            res.status(200).json({
                status: '0',
                message: 'User Created unSuccessfully'
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'User Created unSuccessfully'
        })
    }
}



const getAllRegisterDetails = async (req, res, next) => {
    try {
        const registerDetails = await registerModel.find({}).sort('-1').lean();
        if (registerDetails) {
            res.status(200).json({
                status: '1',
                message: 'User processed successfully',
                data: registerDetails
            })
        } else {
            res.status(200).json({
                status: '0',
                message: 'User processed unSuccessfully',
                data: []
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'User  processed unSuccessfully',
            data: []
        })
    }
}

const singleRegisterDetails = async (req, res, next) => {
    try {
        if (!req.params.id) {
            return res.status(200).json({
                status: '0',
                message: 'User Id missing',
            })
        }
        const registerDetails = await registerModel.findById({ _id: req.params.id }).lean();
        if (registerDetails) {
            res.status(200).json({
                status: '1',
                message: 'User processed successfully',
                data: registerDetails
            })
        } else {
            res.status(200).json({
                status: '0',
                message: 'User processed unSuccessfully'
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'User processed unSuccessfully'
        })
    }
}


const updatedRegisterDetails = async (req, res, next) => {
    try {
        if (!req.params.id) {
            return res.status(200).json({
                status: '0',
                message: 'User Id missing',
            })
        }
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;
        const registerDetails = await registerModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec();
        if (registerDetails) {
            res.status(200).json({
                status: '1',
                message: 'User updated successfully',
            })
        } else {
            res.status(200).json({
                status: '0',
                message: 'User updated unSuccessfully'
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'User updated unSuccessfully'
        })
    }
}

module.exports = {
    createUserDetails: createUserDetails,
    getAllRegisterDetails: getAllRegisterDetails,
    singleRegisterDetails: singleRegisterDetails,
    updatedRegisterDetails: updatedRegisterDetails
}