var jobapply = require('../models/applymodel')
const Users = require('../models/usermodel');
var jobenum = require('../enum');
var jobs = require('../models/jobmodel')

exports.applyjobs = (req, res) => {
    if (!req.body) {
        return res.send({ message: "Cannot be empty" });
    }
    status = jobenum.jobstatus.applied
    Users.findOne({ 'user_id': req.params.id }).then((response)=>
    {
        if (response.role == jobenum.roles.user)
            {
                const data = new jobapply({
                    user_id: req.params.id,
                    job_id: req.body.job_id,
                    company_name: req.body.company_name,
                    job_status: status
            
                })
                data.save().then((response2)=>
                {
                    res.json(response2)
                })
            }
            else{
                res.json({ message: 'Please enter valid user id' });

            }
           
           

    }).catch((err)=>
    {
        res.json({ message: 'Please enter valid user id' })
    })
  
   
}
exports.displayjobs = (req, res) => {

    Users.findOne({ 'user_id': req.params.id })
        .then((response) => {
            if (response.role == jobenum.roles.user)
            {
                let userLocation = response.loc;
                return jobs.find({
                    'loc': {
                        $near: {
                            $geometry: userLocation,
                            $minDistance: 4000
                        }
                    }
                })
            }
            else {
                res.json({ message: 'please enter valid userid' });
            }
            }).then(response => {
                res.json(response);
            }).catch((err) => {
                res.json({ message: 'Please enter valid user id' })
            })

        
         
}

exports.findOne = (req, res) => {
    jobapply.findOne({ 'user_id': req.params.id }, (error1, response) => {
        if (error1) {
            res.status(404).send({
                message: err.message || "Some error occured while Fetching Data From database"
            });
        }
        else {
            Users.findOne({ 'user_id': req.params.id }, (error2, response1) => {
                if (error2) {
                    res.status(404).send({
                        message: err.message || "Some error occured while Fetching Data From database"
                    });
                }
                else {
                    resjob_status.json(response1)
                }
            })

        }
    })

};


exports.findAll = (req, res) => {
    jobapply.find({ 'company_name': req.params.companyname }, (err, response1) => {
        if (err) {
            res.status(404).send({
                message: err.message || "Some error occured while Fetching Data From database"
            });
        }
        else {
            res.json(response1);
        }
    })
}

exports.update_status = (req, res) => {
    if (!req.body) {
        return res.send({
            message: "content cannot be empty"
        });
    }
    //if user is company then update the status else don't update status
    Users.find({ 'user_id': req.params.company_id })
        .then(response1 => {
            if (response1[0].role == jobenum.roles.company) {
                let job_status = req.body.job_status;
                let changedStatus = jobenum.jobstatus[job_status];

                jobapply.findOneAndUpdate({ 'user_id': req.params.user_id ,'company_name':req.body.company_name}, { $set: { job_status: changedStatus } }, { new: true }, (err, response2) => {
                    if (err) {
                        res.status(404).send({
                            message: err.message || "Some error occured while Updating Status"
                        });
                    }
                    else {
                        res.json(response2);
                    }
                })
            }
            else {
                res.json({ message: 'you are not company you cannot update the status' });
            }
        }).catch(err => {
            console.log(err);
        });
}

