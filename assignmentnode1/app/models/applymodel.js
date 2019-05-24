const mongoose = require('mongoose');
const apply = mongoose.Schema({
    user_id:{ type: String, required: true },
    job_id:{ type: String, required: true },
    company_name:{type:String,required:true},
    user_phone:{type:Number,required:true},
    user_name:{type:String,required:true},
    job_designation:{type:String,required:true},
    city: {type:String,required:true},
    salary:{type:Number,required:true},
    job_status:{type:Number,required:true},
   
   

    
},{ versionKey: false });

module.exports=mongoose.model('Apply',apply)