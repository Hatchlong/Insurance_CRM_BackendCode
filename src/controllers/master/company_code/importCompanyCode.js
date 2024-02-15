'use strict';

const companyCode = require('../../../models/master/company_code/company_code');
const countryCodeModel = require('../../../models/master/country/country');
const multer = require('multer');
const XLSX = require('xlsx');
const util = require('util');
const currencyModel = require('../../../models/config/currency/currency');
const langaugeModel = require('../../../models/master/language/language');
const cityModel = require('../../../models/master/country/city');



const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const multerUpload = util.promisify(upload.single('file'));

const fileUploadXlsx = async (req, res, next) => {
    try {
        await multerUpload(req, res);
        const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames;
        sheetName.map(async (ele) => {
            const sheet = workbook.Sheets[ele];

            const data = XLSX.utils.sheet_to_json(sheet);
            const reqBody = []
            for (let i = 0; i < data.length; i++) {
                data[i].isActive = 'O';
                data[i].companyCode = data[i].companyCode.toUpperCase()
                data[i].languageName = data[i].languageName.toLowerCase()
                data[i].countryName = data[i].countryName.toLowerCase()
                data[i].currencyName = data[i].currencyName.toUpperCase()
                data[i].city = data[i].city.toLowerCase()

                var changeValue = await areArraysEqual(data[i],req,res,next);
                if(changeValue){
                    reqBody.push(changeValue)
                }
            }
            if(reqBody.length !== data.length){
                return
            }
            const companyCodeDetails = await companyCode.find({}).sort('-1').lean();

            var isExisted = reqBody.find((el) => companyCodeDetails.some((ele) => ele.companyCode === el.companyCode));
            if (isExisted) {
                return res.status(200).json({
                    status: "0",
                    message: "Company Code " + isExisted.companyCode + " is already exist",
                    duplicate: isExisted
                });
            }
            const createdRecords = await companyCode.create(reqBody);
            if (createdRecords) {
                res.status(200).json({
                    status: "1",
                    message: "Company Code Created Successfully",
                    data: createdRecords
                });
            } else {
                res.status(200).json({
                    status: "0",
                    message: "Company Code Created unSuccessfully",
                    data: null
                });
            }
        })
    } catch (error) {
        console.log(error);
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Company Code Upload unSuccessfully'
        })
    }
}

const areArraysEqual = async (data, req, res, next) => {
    try {
        const findCountry = await countryCodeModel.findOne({ countryName: data.countryName }).lean();
        const findLangauge = await langaugeModel.findOne({ languageName: data.languageName }).lean();
        const findcurrency = await currencyModel.findOne({ code: data.currencyName }).lean();
        const findCities = await cityModel.findOne({ countryId: findCountry._id.toString() }).lean();
        var findCitiesArray = ''
        if (!findCountry) {
            res.status(200).json({
                status: "0",
                message: "Country Name " + data.countryName + " doesn't Exist",
            });
        }
        if(findCities){
             findCitiesArray = findCities.cities.find(el => el === data.city);
            if(!findCitiesArray){
                res.status(200).json({
                    status: "0",
                    message: "City Name " + data.city + " doesn't Exist",
                });  
            }
        }
        if (!findLangauge) {
            res.status(200).json({
                status: "0",
                message: "Language Name " + data.languageName + " doesn't Exist",
            });
        }
        if (!findcurrency) {
            res.status(200).json({
                status: "0",
                message: "Currency Name " + data.currencyName + " doesn't Exist",
            });
        }
        if (findCountry && findLangauge && findcurrency && findCitiesArray) {
            data.countryId = findCountry._id.toString();
            data.languageId = findLangauge._id.toString()
            data.currencyId = findcurrency._id.toString();
            return data;
        }

    } catch (error) {
        console.log(error)
    }


}


// Pagination API
const getAllCompanyCodeDetailsPage = async (req, res, next) => {
    try {
        const companyCodeCount = await companyCode.find({ isActive: 'O' }).count();
        const companyCodeDetails = await companyCode.find({ isActive: 'O' }).skip(req.params.skip).limit(req.params.limit).sort('-1').lean();
        if (companyCodeDetails) {
            res.status(200).json({
                status: '1',
                message: 'Company Code processed successfully',
                data: companyCodeDetails,
                count:companyCodeCount
            })
        } else {
            res.status(200).json({
                status: '0',
                message: 'Company Code processed unSuccessfully',
                data: []
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Company Code  processed unSuccessfully',
            data: []
        })
    }
}




const updatedManyCompanyCodeDetails = async (req, res, next) => {
    try {

        const bulkUpdateOps = req.body.map(record => ({
            updateOne: {
                filter: { _id: record._id },
                update: { $set: record },
            },
        }));

        const result = await companyCode.bulkWrite(bulkUpdateOps);
        if (result) {
            res.status(200).json({
                status: '1',
                message: 'Company Code updated successfully',
            })
        } else {
            res.status(200).json({
                status: '0',
                message: 'Company Code updated unSuccessfully'
            })
        }
    } catch (error) {
        console.log(error)
        next(error)
        res.status(500).json({
            status: '0',
            message: 'Company Code updated unSuccessfully'
        })
    }
}

module.exports = {
    fileUploadXlsx: fileUploadXlsx,
    getAllCompanyCodeDetailsPage:getAllCompanyCodeDetailsPage,
    updatedManyCompanyCodeDetails: updatedManyCompanyCodeDetails,
}