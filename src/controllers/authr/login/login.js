'use strict';

const express = require('express');
const registerModel = require('../../../models/authr/register/register');
const loginModel = require('../../../models/authr/login/login');

const userLogsController = require('../user_log/user_log')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'ZRA';



const loginUserDetails = async (req, res, next) => {
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


        const findUser = await registerModel.findOne({ userName: req.body.userName }).lean();
        if (findUser) {
            const plaintextPassword = req.body.password;
            const isMatch = await bcrypt.compare(plaintextPassword, findUser.password);
            if (isMatch) {

                const findUserDetails = await loginModel.findOne({ userName: req.body.userName }).lean();
                if (findUserDetails) {
                    if (findUserDetails.isActive === true) {
                        return res.status(200).json({
                            status: '0',
                            message: 'User already logged-in',
                        })
                    }
                    req.body.userId = findUserDetails._id.toString()
                    const token = generateAuthToken(req.body);
                    const requestBody = {
                        userName: req.body.userName,
                        password: findUser.password,
                        token: token,
                        isActive : true

                    }
                    const result = await loginModel.findByIdAndUpdate({ _id: findUserDetails._id.toString() }, requestBody, { new: true }).exec();
                    if (result) {

                        userLogsController.createUserLogs(req, res, next)
                        return res.status(200).json({
                            status: '1',
                            message: 'Login Successfully',
                            token: token
                        })
                    } else {
                        return res.status(500).json({
                            status: '0',
                            message: 'Login unSuccessfully',
                            token: token
                        })
                    }
                } else {
                    const token = generateAuthToken(req.body);
                    const requestBody = {
                        userName: req.body.userName,
                        password: findUser.password,
                        token: token,
                        isActive : true
                    }
                    const createLogin = await new loginModel(requestBody)
                    const result = createLogin.save()
                    userLogsController.createUserLogs(req, res, next)
                    return res.status(200).json({
                        status: '1',
                        message: 'Login Successfully',
                        token: token
                    })
                }

            } else {
                return res.status(200).json({
                    status: '0',
                    message: 'Wrong Password'
                })
            }

        } else {
            return res.status(200).json({
                status: '0',
                message: 'Invalid Credentials'
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Login unSuccessfully'
        })
    }
}



// Function to generate a JWT token with user details
function generateAuthToken(userDetails) {
    const token = jwt.sign(userDetails, secretKey, { expiresIn: '1h' }); // You can customize the expiration time

    return token;
}



const verfiyToken = async (req, res, next) => {
    try {
        const decodedToken = verifyAuthToken(req.body.token);
        return res.status(200).json({
            status: '1',
            message: 'Token Verfied Successfully',
        })
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Token Expired'
        })
    }
}

function verifyAuthToken(token) {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        throw error;
    }
}

const logoutUserDetails = async (req, res, next) => {
    try {
        console.log(req.body, 'jjjj')
        if (!req.body.userName) {
            return res.status(200).json({
                status: '0',
                message: 'User Name is missing'
            })
        }

        const findUserDetails = await loginModel.findOne({ userName: req.body.userName }).lean();
        if (findUserDetails) {


            const requestBody = {
                userName: req.body.userName,
                password: findUserDetails.password,
                token: '',
                isActive: false
            }
            const result = await loginModel.findByIdAndUpdate({ _id: findUserDetails._id.toString() }, requestBody, { new: true }).exec();
            if (result) {
                res.status(200).json({
                    status: '1',
                    message: 'Successfully Logout',
                })
                userLogsController.updatedUserLogs(req, res, next)

            } else {
                res.status(200).json({
                    status: '0',
                    message: 'unSuccessfully Logout',
                })
            }

        }


    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'unSuccessfully Logout',
        })
    }
}



module.exports = {
    loginUserDetails: loginUserDetails,
    verfiyToken: verfiyToken,
    logoutUserDetails: logoutUserDetails
}