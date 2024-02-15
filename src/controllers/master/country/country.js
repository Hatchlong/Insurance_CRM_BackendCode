'use strict';

const express = require('express');
const router = express.Router();
const countryModel = require('../../../models/master/country/country');
const stateControllers = require('./state');
const cityModel = require('../../../models/master/country/city');
const stateModel = require('../../../models/master/country/state');




const createCountry = async (req, res, next) => {
    try {
        req.body.countryCode = req.body.countryCode.toUpperCase();
        req.body.countryName = req.body.countryName.toLowerCase();
        req.body.isActive = 'O';
        const countryCreated = await new countryModel(req.body);
        const result = countryCreated.save()
        if (result) {
            if (req.body.states.length !== 0) {
                req.body.countryId = countryCreated._id.toString()
                stateControllers.createState(req, res, next)
            } else {
                res.status(200).json({
                    status: '1',
                    message: 'Country Created Successfully'
                })
            }
        } else {
            res.status(200).json({
                status: '0',
                message: 'Country Created unSuccessfully'
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Country Created unSuccessfully'
        })
    }
}


const getAllCountryDetails = async (req, res, next) => {
    try {
        const countryDetails = await countryModel.find({ isActive: "O" }).sort('-1').lean();

        if (countryDetails) {
            const stateDetails = await stateModel.find({}).sort('-1').lean();
            const cityDetails = await cityModel.find({}).sort('-1').lean();

            countryDetails.forEach((obj1) => {
                const matchingStateData = stateDetails.filter((obj2) => obj2.countryId === obj1._id.toString());
                if (matchingStateData !== undefined) {

                    if (matchingStateData) {
                        obj1.states = matchingStateData;
                    } else {
                        obj1.states = []
                    }
                    matchingStateData.map((el) => {
                        var matchingCitiesData = cityDetails.filter((obj3) => obj3.stateId === el._id.toString());
                        if (matchingCitiesData) {
                            return el.cities = matchingCitiesData;
                        } else {
                            obj1.cities = []
                        }
                    })

                }

            });

            res.status(200).json({
                status: '1',
                message: 'Country processed successfully',
                data: countryDetails
            })
        } else {
            res.status(200).json({
                status: '0',
                message: 'Country processed unSuccessfully',
                data: []
            })
        }
    } catch (error) {
        console.log(error)
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Country processed unSuccessfully',
            data: []
        })
    }
}

const singleCountryDetails = async (req, res, next) => {
    try {
        if (!req.params.id) {
            return res.status(200).json({
                status: '0',
                message: 'Country Id missing',
            })
        }
        const countryDetails = await countryModel.findById({ _id: req.params.id }).lean();
        if (countryDetails) {
            const stateDetails = await stateModel.find({ countryId: countryDetails._id.toString() }).sort('-1').lean();
            const cityDetails = await cityModel.find({}).sort('-1').lean();

            countryDetails.states = stateDetails;

            countryDetails.states.forEach((el) => {
                var matchingCitiesData = cityDetails.filter((obj3) => obj3.stateId === el._id.toString());
                el.cities = matchingCitiesData;
            })


            res.status(200).json({
                status: '1',
                message: 'Country processed successfully',
                data: countryDetails
            })
        } else {
            res.status(200).json({
                status: '0',
                message: 'Country processed unSuccessfully'
            })
        }
    } catch (error) {
        console.log(error)
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Country processed unSuccessfully'
        })
    }
}


const updatedCountryDetails = async (req, res, next) => {
    try {
        if (!req.params.id) {
            return res.status(200).json({
                status: '0',
                message: 'Country Id missing',
            })
        }
        const countryDetials = await countryModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec();
        if (countryDetials) {
            if (req.body.states.length !== 0) {
                req.body.countryId = req.params.id
                stateControllers.updatedStateDetails(req, res, next)
            } else {
                res.status(200).json({
                    status: '1',
                    message: 'Country updated successfully',
                })
            }

        } else {
            res.status(200).json({
                status: '0',
                message: 'Country updated unSuccessfully'
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Country updated unSuccessfully'
        })
    }
}


module.exports = {
    createCountry: createCountry,
    getAllCountryDetails: getAllCountryDetails,
    singleCountryDetails: singleCountryDetails,
    updatedCountryDetails: updatedCountryDetails
}