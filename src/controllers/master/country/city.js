'use strict';

const express = require('express');
const router = express.Router();
const cityModel = require('../../../models/master/country/city');



const createCity = async (data,req, res, next) => {
    try {
        data.cities = data.cities.map((el) => {
            return el = el.toLowerCase();

        })
        const requestBody = {
            stateId: data.stateId,
            cities: data.cities
        }
        const cityCreated = await new cityModel(requestBody);
        const result = cityCreated.save()
        
    } catch (error) {
        console.log(error);
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Country Created unSuccessfully'
        })
    }
}

const updatedCityDetails = async (req, res, next) => {
    try {
        if (!req.body.countryId) {
            return res.status(200).json({
                status: '0',
                message: 'Country Id missing',
            })
        }
        const findDetails = await cityModel.findOne({ stateId: req.body.stateId }).lean();
        if (findDetails) {
            const requestBody = {
                stateId: req.body.stateId,
                cities: req.body.cities
            }
            const cityDetails = await cityModel.findByIdAndUpdate({ _id: findDetails._id.toString() }, requestBody, { new: true }).exec();
            if (cityDetails) {
                res.status(200).json({
                    status: '1',
                    message: 'Country updated successfully',
                })
            } else {
                res.status(500).json({
                    status: '0',
                    message: 'Country updated unSuccessfully'
                })
            }
        } else {
            const requestBody = {
                stateId: req.body.stateId,
                cities: req.body.cities
            }
            const cityCreated = await new cityModel(requestBody);
            const result = cityCreated.save()
            if (result) {
                res.status(200).json({
                    status: '1',
                    message: 'Country updated Successfully'
                })
            } else {
                res.status(500).json({
                    status: '0',
                    message: 'Country updated unSuccessfully'
                })
            }
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
    createCity: createCity,
    updatedCityDetails: updatedCityDetails
}