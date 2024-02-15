'use strict';

const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const RtoStateSchema=new Schema({   
    rtoStateCode:{
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

const RtoStateMasterSchema=mongoose.model('sttm_rto_state',RtoStateSchema)
module.exports=RtoStateMasterSchema