'use strict'

const express = require('express');
const router = express.Router();



const authrRegisterRouter = require('../controllers/authr/register/register');
const authrLoginRouter = require('../controllers/authr/login/login');
const uploadRouter = require('../controllers/upload/file_upload');

const agentRouter = require('../controllers/master/agent/agent');

const financialRouter=require('../controllers/master/financialPeriod/financialPeriod');

const policyPlanRouter=require('../controllers/master/policy-plan/policyPlan')

const applyPolicyRouter = require('../controllers/applyPolicy/applyPolicy')

const companyCodeRouter = require('../controllers/master/companyCode/companyCode')

const vehicleRouter = require('../controllers/master/vehicleCategory/vehicleCategory');

const rtoStateRouter = require('../controllers/master/rtoState/rtoState');


const masterCustomerRouters = require('../controllers/master/customer/customer');
const customerImportRouter=require('../controllers/master/customer/customerImport')

const masterVendorRouters = require('../controllers/master/vendor/vendor');


let routes = app => {
  // Register Router Path
  router.post('/api/auth/user/create', authrRegisterRouter.createUserDetails)
  router.get('/api/auth/user/getAll', authrRegisterRouter.getAllRegisterDetails)
  router.get('/api/auth/user/get/:id', authrRegisterRouter.singleRegisterDetails)
  router.put('/api/auth/user/update/:id', authrRegisterRouter.updatedRegisterDetails)

  // Login Router Path
  router.post('/api/auth/user/login', authrLoginRouter.loginUserDetails)
  router.post('/api/auth/user/verifyToken', authrLoginRouter.verfiyToken)
  router.post('/api/auth/user/logout', authrLoginRouter.logoutUserDetails)

  //Agent Router Path
  router.post('/api/master/agent/create', agentRouter.createAgent)
  router.get('/api/master/agent/getAll', agentRouter.getAllAgentDetail)
  router.get('/api/master/agent/get/:id', agentRouter.singleAgentDetail)
  router.put('/api/master/agent/update/:id', agentRouter.updateAgentDetail)
  router.put('/api/master/agent/update', agentRouter.updatedManyInventoryDetails)
  router.get('/api/master/agent/getAll/:skip/:limit', agentRouter.getAllInventoryDetailsPage)

  //Financial Period Router Path
  router.post('/api/master/financial/create',financialRouter.createFinancial)
  router.get('/api/master/financial/getAll',financialRouter.getAllFinancialDetail)
  router.get('/api/master/financial/get/:id',financialRouter.singleFinancialDetail)
  router.put('/api/master/financial/update/:id',financialRouter.updateFinancialDetail)

  //Policy Plan Router Path
  router.post('/api/master/policyPlan/create', policyPlanRouter.createPolicyPlan)
  router.get('/api/master/policyPlan/getAll', policyPlanRouter.getAllPolicyPlan)
  router.get('/api/master/policyPlan/get/:id', policyPlanRouter.singlePolicyPlanDetail)
  router.put('/api/master/policyPlan/update/:id', policyPlanRouter.updatePolicyPlanDetail)
  router.put('/api/master/policyPlan/update', policyPlanRouter.updatedManyPolicyPlanDetails)
  router.get('/api/master/policyPlan/getAll/:skip/:limit', policyPlanRouter.getAllpolicyPlanDetailsPage)

  //Apply Policy Router Path
  router.post('/api/applyPolicy/applyPolicy/create', applyPolicyRouter.createApplyPolicyData)
  router.get('/api/applyPolicy/applyPolicy/getAll', applyPolicyRouter.getAllApplyPolicyData)
  router.get('/api/applyPolicy/applyPolicy/get/:id', applyPolicyRouter.singleApplyPolicydetail)
  router.put('/api/applyPolicy/applyPolicy/update/:id', applyPolicyRouter.updateApplyPolicyDetail)
  router.put('/api/applyPolicy/applyPolicy/update', applyPolicyRouter.updatedManyApplyPolicyDetails)
  router.get('/api/applyPolicy/applyPolicy/getAll/:skip/:limit', applyPolicyRouter.getAllappPolicyDetailsPage)


  //Company Code Router Path
  router.post('/api/setting/companyCode/create', companyCodeRouter.createCompanyCode)
  router.get('/api/setting/companyCode/getAll', companyCodeRouter.getAllCompanyCodeDetail)
  router.get('/api/setting/companyCode/get/:id', companyCodeRouter.singleCompanyCodeDetail)
  router.put('/api/setting/companyCode/update/:id', companyCodeRouter.updateCompanyCodeDetail)
  router.put('/api/setting/companyCode/update', companyCodeRouter.updatedManyCompanyCodeDetails)
  router.get('/api/setting/companyCode/getAll/:skip/:limit', companyCodeRouter.getAllcompanyCodeDetailsPage)


  //RTO State Router Path
  router.post('/api/setting/rtoState/create', rtoStateRouter.createRtoState)
  router.get('/api/setting/rtoState/getAll', rtoStateRouter.getAllRtoStateDetail)
  router.get('/api/setting/rtoState/get/:id', rtoStateRouter.singleRtoStateDetail)
  router.put('/api/setting/rtoState/update/:id', rtoStateRouter.updateRtoStateDetail)
  router.put('/api/setting/rtoState/update', rtoStateRouter.updatedManyRtoStateDetails)
  router.get('/api/setting/rtoState/getAll/:skip/:limit', rtoStateRouter.getAllrtoStateDataDetailsPage)


  //Vehicle Router Path
  router.post('/api/setting/vehicle/create', vehicleRouter.createVehicle)
  router.get('/api/setting/vehicle/getAll', vehicleRouter.getAllVehicleDetail)
  router.get('/api/setting/vehicle/get/:id', vehicleRouter.singleVehicleDetail)
  router.put('/api/setting/vehicle/update/:id', vehicleRouter.updateVehicleDetail)
  router.put('/api/setting/vehicle/update', vehicleRouter.updatedManyVehicleCategoryDetails)
  router.get('/api/setting/vehicle/getAll/:skip/:limit', vehicleRouter.getAllvehicleDataDetailsPage)



  // Customer Router Path
  router.post('/api/master/customerMaster/create', masterCustomerRouters.createCustomer)
  router.get('/api/master/customerMaster/getAll', masterCustomerRouters.getAllCustomerDetails)
  router.get('/api/master/customerMaster/get/:id', masterCustomerRouters.singleCustomerDetails)
  router.put('/api/master/customerMaster/update/:id', masterCustomerRouters.updatedCustomerDetails)
  router.put('/api/master/customerMaster/update', customerImportRouter.updatedManyCustomerDetails)
  router.get('/api/master/customerMaster/getAll/:skip/:limit', customerImportRouter.getAllcustomerDetailsPage)

  // Vendor Router Path
  router.post('/api/master/vendor/create', masterVendorRouters.createVendor)
  router.get('/api/master/vendor/getAll', masterVendorRouters.getAllVendorDetails)
  router.get('/api/master/vendor/get/:id', masterVendorRouters.singleVendorDetails)
  router.put('/api/master/vendor/update/:id', masterVendorRouters.updatedVendorDetails)
  router.put('/api/master/vendor/update', masterVendorRouters.updatedManyVendorDetails)
  router.get('/api/master/vendor/getAll/:skip/:limit', masterVendorRouters.getAllVendorDetailsPage)


  router.post('/api/upload', uploadRouter.upload)


  return app.use('/', router)
}


module.exports = routes