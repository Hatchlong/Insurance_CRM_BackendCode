'use strict';

const express = require('express');
const router = express.Router();
const stateModel = require('../../../models/master/country/state');
const citiesController = require('./city')

const createState = async (req, res, next) => {
    try {
        req.body.states.map((el) => {
            el.state = el.state.toLowerCase();

        })
        const stateDetails = []
        req.body.states.map(async (el) => {
            const reqData = {
                countryId: req.body.countryId,
                states: el.state
            }
            stateDetails.push(reqData)
        })

        const stateCreated = await stateModel.create(stateDetails);
        if (stateCreated.length !== 0) {
            stateCreated.map((el, i) => {
                if (req.body.states[i].cities.length !== 0) {
                    req.body.states[i].stateId = el._id.toString()
                    citiesController.createCity(req.body.states[i], req, res, next)
                } else {
                    res.status(200).json({
                        status: '1',
                        message: 'Country Created Successfully'
                    })
                }

            })
            res.status(200).json({
                status: '1',
                message: 'Country Created Successfully'
            })
        } else {
            res.status(500).json({
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

const updatedStateDetails = async (req, res, next) => {
    try {
        if (!req.body.countryId) {
            return res.status(200).json({
                status: '0',
                message: 'Country Id missing',
            })
        }
        const findDetails = await stateModel.findOne({ countryId: req.body.countryId }).lean();
        if (findDetails) {
            const stateDetails = []

            const bulkUpdateOps = stateDetails.map(record => ({
                updateOne: {
                    filter: { _id: record._id },
                    update: { $set: record },
                },
            }));
            const stateFindDetails = await stateModel.find({ countryId: req.params.id }).lean();
            console.log(stateFindDetails, req.body.states, 'stateFindDetails')
            for (let i = 0; i < stateFindDetails.length; i++) {
                var reqData = {
                    _id: stateFindDetails[i]._id.toString(),
                    countryId: stateFindDetails[i].countryId,
                    states:''
                }
                // for (let j = 0; j < req.body.states.length; j++) {
                //   reqData.states =  req.body.states[j].state
                // }
                stateDetails.push(reqData)

            }
            // stateFindDetails.forEach((ele) => {
               
            //     req.body.states.forEach((el) => {
            //         var reqData = {
            //             _id: ele._id.toString(),
            //             countryId: ele.countryId,
            //             states: ''
            //         }
            //         reqData.states = el.state;

            //     })

            // })
            // if (stateFindDetails) {
            //     const stateDetails = await stateModel.findByIdAndUpdate({ _id: findDetails._id.toString() }, stateDetails, { new: true }).exec();
            //     if (stateDetails) {
            //         if (req.body.cities.length !== 0) {
            //             req.body.stateId = stateFindDetails._id.toString()
            //             citiesController.updatedCityDetails(req, res, next)
            //         } else {
            //             res.status(200).json({
            //                 status: '1',
            //                 message: 'Country updated successfully',
            //             })
            //         }
            //     } else {
            //         res.status(500).json({
            //             status: '0',
            //             message: 'Country updated unSuccessfully'
            //         })
            //     }
            // }

        } else {
            const requestBody = {
                countryId: req.body.countryId,
                cities: req.body.cities
            }
            const stateCreated = await new stateModel(requestBody);
            const result = stateCreated.save()
            if (result) {
                if (req.body.cities.length !== 0) {
                    req.body.stateId = stateCreated._id.toString()
                    citiesController.createCity(req, res, next)
                } else {
                    res.status(200).json({
                        status: '1',
                        message: 'Country Created Successfully'
                    })
                }

            } else {
                res.status(500).json({
                    status: '0',
                    message: 'Country updated unSuccessfully'
                })
            }
        }

    } catch (error) {
        console.log(error)
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Country updated unSuccessfully'
        })
    }
}


module.exports = {
    createState: createState,
    updatedStateDetails: updatedStateDetails
}