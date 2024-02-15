'use strict';

const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const VehicleSchema=new Schema({   
    vehicleCategory:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    isLock:{
        type:String
    },
    isActive:{
        type:String
    }
})

const vehicleMasterSchema=mongoose.model('sttm_vehicle_category',VehicleSchema)
module.exports=vehicleMasterSchema