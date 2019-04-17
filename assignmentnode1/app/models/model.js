const mongoose = require('mongoose');

const Users = mongoose.Schema({
    user_id:{type: Number,required:true},
    name:{type: String, required: true},
    email:{type: String, required: true},
    mobile:{type: Number, required: true},
    role:{type:Number,required:true},
    loc: {
        type: { type: Number },
        coordinates: []
    }
},{ versionKey: false });
const jobs = mongoose.Schema({
    job_id:{type:Number, required: true},
    job_description:{type: String, required: true},
    company_name:{type: String, required: true},
    loc: {
        type: { type: Number },
        coordinates: []
    } 
},{ versionKey: false });
const apply = mongoose.Schema({
    user_id:{type: Number, required: true},
    job_id:{type: Number, required: true},
    job_status:{type:Number,required:true},
    loc: {
        type: { type: Number },
        coordinates: []
    } 
},{ versionKey: false });



module.exports=
{
User:mongoose.model('users', Users),
jobs :mongoose.model('jobs', jobs),
apply:mongoose.model('Apply',apply)
}

