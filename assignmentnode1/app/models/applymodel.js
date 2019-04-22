const mongoose = require('mongoose');
const apply = mongoose.Schema({
    user_id:{type: Number},
    job_id:{type: Number, required: true},
    job_status:{type:Number,required:true},
    company_name:{type:String,required:true},
    
},{ versionKey: false });

module.exports=mongoose.model('Apply',apply)