const mongoose = require('mongoose');

const Users = mongoose.Schema({
    // user_id: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    mobile: { type: Number, required: true },
    role: { type: Number, required: true },
    skills:{ type : Array , required:true }


    // loc: {
    //     type: { type: String },
    //     coordinates: []
    // }
}, { versionKey: false });
Users.index({ loc: "2dsphere" })

module.exports = mongoose.model('users', Users)

