'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VendorFinancial=new Schema({
    vendorId:{
        type:String,
        reuired:true
    },
    financialData:[{
        taxNumber: {
            type:String
        },
      vatRegistrationNo: {
        type:String
      },
      currency: {
        type:String
      },
      companyCode: {
        type:String
      },
      bankAccount: {
        type:String
      },
      accountHolder: {
        type:String
      },
      paymentMethod: {
        type:String
      },
    }]
})

const vendorFinancialSchema=mongoose.model('sttm_vendor_financial',VendorFinancial)

module.exports=vendorFinancialSchema