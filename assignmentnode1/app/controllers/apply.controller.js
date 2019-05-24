var jobapply = require('../models/applymodel')
const Users = require('../models/usermodel');
var jobenum = require('../enum');
var jobs = require('../models/jobmodel')


exports.applyjobs = (req, res) => {
    var status_flag = jobenum.jobstatus.applied;
    if (!req.body) {
        return res.send({ message: "Cannot be empty" });
    }
    else {
        const data = new jobapply({
            user_id: req.body.user_id,
            job_id: req.body.job_id,
            company_name: req.body.company_name,
            user_phone:req.body.phone,
            user_name: req.body.user_name,
            job_designation: req.body.job_designation,
            city: req.body.location,
            salary: req.body.salary,
            job_status: status_flag,
        })
        data.save((err, respo) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send(respo);
            }
        })
    }
}



// exports.displayjobs = (req, res) => {

//     Users.findOne({ 'user_id': req.params.id })
//         .then((response) => {
//             if (response.role == jobenum.roles.user)
//             {
//                 let userLocation = response.loc;
//                 return jobs.find({
//                     'loc': {
//                         $near: {
//                             $geometry: userLocation,
//                             $minDistance: 4000
//                         }
//                     }
//                 })
//             }
//             else {
//                 res.json({ message: 'please enter valid userid' });
//             }
//             }).then(response => {
//                 res.json(response);
//             }).catch((err) => {
//                 res.json({ message: 'Please enter valid user id' })
//             })

        
         
// }

// exports.findOne = (req, res) => {
//     jobapply.findOne({ 'user_id': req.params.id }, (error1, response) => {
//         if (error1) {
//             res.status(404).send({
//                 message: err.message || "Some error occured while Fetching Data From database"
//             });
//         }
//         else {
//             Users.findOne({ 'user_id': req.params.id }, (error2, response1) => {
//                 if (error2) {
//                     res.status(404).send({
//                         message: err.message || "Some error occured while Fetching Data From database"
//                     });
//                 }
//                 else {
//                     resjob_status.json(response1)
//                 }
//             })

//         }
//     })

// };


exports.findAll = (req, res) => {
    jobapply.find(
      { company_name: req.params.companyname },
      (err, data) => {
        if (err) {
          console.log(err)
        } else {
          res.send(data)
        }
      }
    )
  }

exports.find_applies = (req, res) => {
    jobapply.find({ 'user_id': req.params.user_id }, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(data);
        }
    })
}
// exports.update_status = (req, res) => {
//     if (!req.body) {
//         return res.send({
//             message: "content cannot be empty"
//         });
//     }
//     //if user is company then update the status else don't update status
//     Users.find({ 'user_id': req.params.company_id })
//         .then(response1 => {
//             if (response1[0].role == jobenum.roles.company) {
//                 let job_status = req.body.job_status;
//                 let changedStatus = jobenum.jobstatus[job_status];

//                 jobapply.findOneAndUpdate({ 'user_id': req.params.user_id ,'company_name':req.body.company_name}, { $set: { job_status: changedStatus } }, { new: true }, (err, response2) => {
//                     if (err) {
//                         res.status(404).send({
//                             message: err.message || "Some error occured while Updating Status"
//                         });
//                     }
//                     else {
//                         res.json(response2);
//                     }
//                 })
//             }
//             else {
//                 res.json({ message: 'you are not company you cannot update the status' });
//             }
//         }).catch(err => {
//             console.log(err);
//         });
// }
exports.updatestatus = (req, res) => {
    if (!req.body) {
      return res.send({
        message: 'Note content can not be empty'
      })
    }
    let status = req.body.job_status
    let change_status = jobenum.jobstatus[status]
    jobapply.updateMany(
      { _id: req.body.id },
      {
        $set: {
          user_id: req.body.user_id,
          user_name: req.body.user_name,
          job_id: req.body.job_id,
          company_name: req.body.company_name,
          job_designation: req.body.job_designation,
          salary: req.body.salary,
          city: req.body.location,
          job_status: change_status
        }
      },
      { new: true },
      (err, response) => {
        if (err) {
          console.log(err)
        } else {
          res.send(response)
        }
      }
    )
  }

