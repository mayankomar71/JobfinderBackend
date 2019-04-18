var jobapply = require('../models/model')
var jobenum = require('./enum');

exports.create = (req, res) => {
    if (!req.body) {
        return res.send({ message: "Cannot be empty" });
    }
    status=jobenum.jobstatus.applied
    const data = new jobapply.apply({
        user_id:req.params.id,
        job_id:req.body.job_id,
        company_name:req.body.company_name,
        job_status:status

    })
    data.save((err,response)=>
    {
        if(err)
        {
            res.send("Data insertion Error")
        }
        else
        {
            res.json(response)
        }
    })
}
exports.findOne = (req, res) => {
    jobapply.apply.findOne({ 'user_id': req.params.id }, (error1, response) => {
        if (error1) {
            res.status(404).send({
                message: err.message || "Some error occured while Fetching Data From database"
            });
        }
        else {
           jobapply.User.findOne({'user_id':req.params.id},(error2,response1)=>
           {
               if(error2)
               {
                res.status(404).send({
                    message: err.message || "Some error occured while Fetching Data From database"
                });
               }
               else
               {
                   res.json(response1)
               }
           })

        }
    })

};
exports.update = (req, res) => {
	// Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Data content can not be empty"
        });
    }

    // Find Data and update it with the request body
    
    jobapply.apply.findOneAndUpdate({'user_id':req.params.id}, {$set: req.body}, {new: true})
    .then(updateddata => {
        if(!updateddata) {
            return res.status(404).send({
                message: "Data not found with id " + req.params.id
            });
        }
        res.send(updateddata);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Data not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating Data with id " + req.params.id
        });
    });
};