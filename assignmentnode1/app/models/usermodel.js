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

module.exports=mongoose.model('users', Users)

