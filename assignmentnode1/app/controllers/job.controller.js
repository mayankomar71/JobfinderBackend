var jobs=require('../models/jobmodel');
const Users = require('../models/usermodel');
var myenum = require('./enum');


exports.create=(req, res)=>{
    if (!req.body) {
        return res.send({ message: "Cannot be empty data" });
    }
    Users.find({'user_id':req.params.id})
    .then(response=>{
        const data= new jobs({
            job_id:req.body.job_id,
            job_description:req.body.job_description,
            company_name:req.body.company_name,
            loc:response[0].loc
        })
        if(response[0].role==myenum.roles.admin){
            data.save((err,respo)=>{
                if(err){
                    console.log(err);
                }
                else{
                    res.send(respo);
                }
            })
        }
        else if(response[0].role==myenum.roles.company){
            data.save((err,respo)=>{
                if(err){
                    console.log(err);
                }
                else{
                    res.send(respo);
                }
            })
        }
        else{
            res.send({message:'user cannot add job'});
        }
    }).catch(err=>{
        res.send({message:err});
    })
}

exports.findAll = (req, res) => {
    jobs.find((err, response) => {
        if (err) {
            res.status(404).send({
                message: err.message || "Some error occured while Fetching Data From database"
            });
        }
        else {
            res.send(response)
        }
    })

};

exports.deleteOne = (req, res) => {
    jobs.findOneAndDelete({ 'job_id': req.params.id }, (err, response) => {
        if (!response) {
            res.send({ message: "no such data exist in databse" });
        }
        else if (err) {
            console.log(err);
        }
        else {
            res.send({ Message: "Data deleted successfully" });
        }
    })
}

exports.update = (req, res) => {
    if (!req.body) {
        return res.send({
            message: "Data content can not be empty"
        });
    }

    jobs.findOneAndUpdate({ 'job_id': req.params.id }, { $set: req.body }, { new: true }, (err, response) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(response);
        }
    });
}