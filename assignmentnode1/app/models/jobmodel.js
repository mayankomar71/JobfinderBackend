const mongoose = require('mongoose');
const jobs = mongoose.Schema({
    job_id:{type:Number, required: true},
    job_description:{type: String, required: true},
    company_name:{type: String, required: true},
    loc: {
        type: { type: Number },
        coordinates: []
    } 
},{ versionKey: false });
module.exports=mongoose.model('jobs', jobs)