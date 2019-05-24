const mongoose = require('mongoose');
const jobs = mongoose.Schema({
    // job_id:{type:Number, required: true},
     // loc: {
    //     type: { type: String },
    //     coordinates: []
    // },
    job_designation:{type: String, required: true},
    company_name:{type: String, required: true},
    salary:{type:Number,required:true},
    city:{type:String,required:true},
    skills:{ type : Array , required:true }

},{ versionKey: false });
jobs.index({loc:"2dsphere"})
module.exports=mongoose.model('jobs', jobs)