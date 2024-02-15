'use strict'

const express = require('express');
const router = express.Router();



const authrRegisterRouter = require('../controllers/authr/register/register');
const authrLoginRouter = require('../controllers/authr/login/login');
const uploadRouter = require('../controllers/upload/file_upload');

const agentRouter=require('../controllers/master/agent/agent');

const policyPlanRouter=require('../controllers/master/policy-plan/policyPlan')

const applyPolicyRouter=require('../controllers/applyPolicy/applyPolicy')

const companyCodeRouter=require('../controllers/master/companyCode/companyCode')

const vehicleRouter=require('../controllers/master/vehicleCategory/vehicleCategory');

const rtoStateRouter=require('../controllers/master/rtoState/rtoState');


const masterCustomerRouters = require('../controllers/master/customer/customer');


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
  router.post('/api/master/agent/create',agentRouter.createAgent)
  router.get('/api/master/agent/getAll',agentRouter.getAllAgentDetail)
  router.get('/api/master/agent/get/:id',agentRouter.singleAgentDetail)
  router.put('/api/master/agent/update/:id',agentRouter.updateAgentDetail)
  router.put('/api/master/agent/update', agentRouter.updatedManyInventoryDetails)
  router.get('/api/master/agent/getAll/:skip/:limit',agentRouter.getAllInventoryDetailsPage)

  //Policy Plan Router Path
  router.post('/api/master/policyPlan/create',policyPlanRouter.createPolicyPlan)
  router.get('/api/master/policyPlan/getAll',policyPlanRouter.getAllPolicyPlan)
  router.get('/api/master/policyPlan/get/:id',policyPlanRouter.singlePolicyPlanDetail)
  router.put('/api/master/policyPlan/update/:id',policyPlanRouter.updatePolicyPlanDetail)

  //Apply Policy Router Path
  router.post('/api/applyPolicy/applyPolicy/create',applyPolicyRouter.createApplyPolicyData)
  router.get('/api/applyPolicy/applyPolicy/getAll',applyPolicyRouter.getAllApplyPolicyData)
  router.get('/api/applyPolicy/applyPolicy/get/:id',applyPolicyRouter.singleApplyPolicydetail)
  router.put('/api/applyPolicy/applyPolicy/update/:id',applyPolicyRouter.updateApplyPolicyDetail)


  //Company Code Router Path
  router.post('/api/setting/companyCode/create',companyCodeRouter.createCompanyCode)
  router.get('/api/setting/companyCode/getAll',companyCodeRouter.getAllCompanyCodeDetail)
  router.get('/api/setting/companyCode/get/:id',companyCodeRouter.singleCompanyCodeDetail)
  router.put('/api/setting/companyCode/update/:id',companyCodeRouter.updateCompanyCodeDetail)


  //RTO State Router Path
  router.post('/api/setting/rtoState/create',rtoStateRouter.createRtoState)
  router.get('/api/setting/rtoState/getAll',rtoStateRouter.getAllRtoStateDetail)
  router.get('/api/setting/rtoState/get/:id',rtoStateRouter.singleRtoStateDetail)
  router.put('/api/setting/rtoState/update/:id',rtoStateRouter.updateRtoStateDetail)

  //Vehicle Router Path
  router.post('/api/setting/vehicle/create',vehicleRouter.createVehicle)
  router.get('/api/setting/vehicle/getAll',vehicleRouter.getAllVehicleDetail)
  router.get('/api/setting/vehicle/get/:id',vehicleRouter.singleVehicleDetail)
  router.put('/api/setting/vehicle/update/:id',vehicleRouter.updateVehicleDetail)


  // Customer Router Path
  router.post('/api/master/customerMaster/create', masterCustomerRouters.createCustomer)
  router.get('/api/master/customerMaster/getAll', masterCustomerRouters.getAllCustomerDetails)
  router.get('/api/master/customerMaster/get/:id', masterCustomerRouters.singleCustomerDetails)
  router.put('/api/master/customerMaster/update/:id', masterCustomerRouters.updatedCustomerDetails)


  router.post('/api/upload', uploadRouter.upload)


  return app.use('/', router)
}


module.exports = routes