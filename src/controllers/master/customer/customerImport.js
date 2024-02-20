'use strict';

const customerModel = require('../../../models/master/customer/customer');
const customerPlantControllers = require('./customerVehicle');
const customerNomineeModel = require('../../../models/master/customer/customerNominee');
const customerVehicleModel = require('../../../models/master/customer/customerVehicle');


// Pagination API
const getAllcustomerDetailsPage = async (req, res, next) => {
    try {
        const customerDataCount = await customerModel.find({ isActive: 'O' }).count();
        const customerDetails = await customerModel.find({ isActive: 'O' }).skip(req.params.skip).limit(req.params.limit).sort('-1').lean();

        if (customerDetails) {
            const customerPlantDetails = await customerVehicleModel.find({}).sort('-1').lean();
            const customerSalesDetails = await customerNomineeModel.find({}).sort('-1').lean();

            customerDetails.forEach((obj1) => {
                const matchingvechicleDetails = customerPlantDetails.find((obj2) => obj2.productId === obj1.customerId);
                const matchingSalesDetails = customerSalesDetails.find((obj2) => obj2.productId === obj1.customerId);
                if (matchingvechicleDetails || matchingSalesDetails) {
                    obj1.vechicleDetails = matchingvechicleDetails.vechicleDetails;
                    obj1.nomineeDetails = matchingSalesDetails.nomineeDetails;
                }
            });
            res.status(200).json({
                status: '1',
                message: 'Customer processed successfully',
                data: customerDetails,
                count: customerDataCount
            })
        } else {
            res.status(200).json({
                status: '0',
                message: 'Customer processed unSuccessfully',
                data: []
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Customer  processed unSuccessfully',
            data: []
        })
    }
}




const updatedManyCustomerDetails = async (req, res, next) => {
    try {
        const bulkUpdateOps = req.body.map(record => ({
            updateOne: {
                filter: { _id: record._id },
                update: { $set: record },
            },
        }));

        const result = await customerModel.bulkWrite(bulkUpdateOps);
        if (result) {
            res.status(200).json({
                status: '1',
                message: 'Customer updated successfully',
            })
        } else {
            res.status(200).json({
                status: '0',
                message: 'Customer updated unSuccessfully'
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Customer updated unSuccessfully'
        })
    }
}

module.exports={
    getAllcustomerDetailsPage:getAllcustomerDetailsPage,
    updatedManyCustomerDetails:updatedManyCustomerDetails
}