var jobs=require('../models/jobmodel');
const Users = require('../models/usermodel');
var myenum = require('../enum');


exports.create=(req, res)=>{
  
        const newjob= new jobs({
            job_designation:req.body.job_designation,
            company_name:req.body.company_name,
            salary:req.body.salary,
            city:req.body.city,
            skills:req.body.tags
        })
    
            newjob.save((err, response) => {
                if (err) {
                    res.status(500).send({
                        message: err.message || "Some error occured while Posting Data to database"
                    });
                }
                else {
                    res.send(response)
                }
            })
        }
       
   
exports.findAlljobs = (req, res) => {
    var pageNo = req.params.page;
    var size = 4;
    jobs.count({}, (err, total) => {
        if (err) 
        {
            res.json({ 'message': err });
                
        }
    jobs.find({},(err, data) => {
        if (err) {
            res.status(404).send({
                message: err.message || "Some error occured while Fetching Data From database"
            });
               }
    else {
         var pages = Math.ceil(total / size);
         console.log(total);
        res.json({ 'message':data, 'page': pages })
                    // res.send(response)
        }
        }).limit(size).skip(size * (pageNo - 1))
        })
        }

exports.findAll = (req, res) => {
    var pageNo = req.params.page;
    var size = 4;
    var skills=req.query.skills
    var newdata=[]
    console.log(skills)
    count=0
    array=[]
    skills=skills.map((data)=>JSON.parse(data))
    jobs.find((err, data) => {
        if (err) {
            res.status(404).send({
                message: err.message || "Some error occured while Fetching Data From database"
            });
        }
        else {
            data.map((jobdata,index)=>
            {
                count=0
                console.log("current job being matched",jobdata)
                jobdata.skills.map((jobskills,index2)=>
                {
                   
                    skills.map((userskills,index3)=>
                    {
                        if(jobskills.id===userskills.id)
                        {
                        count++
                        

                        }

                    })
                    
                })
                if(count>0)
                {
                    newdata.push({ count: count, job:jobdata,time:jobdata.time})
                }
                console.log('count',count)
               
            })
            var sortedarray=newdata.sort(function (a, b) {
                if(a.count!==b.count)
                {
                return b.count - a.count
                }
                else
                {
                    return b.time-a.time
                }
            })
            sortedarray.map((data)=>
            {
                array.push(data.job)
            })
            total=array.length
            var pages = Math.ceil(total/ size);
            console.log("pages",  pages)
            console.log('new array', sortedarray)
            res.json({ 'message':array, 'page': pages })
        }
    })


}

exports.company_jobs=(req,res)=>
{
    var pageNo = req.params.page;
    var size = 4;
    jobs.count({ 'company_name': req.params.company }, (err, total) => {

    if (err) {
            res.json({ 'message': err });
        }

    jobs.find({'company_name':req.params.company}).limit(size).skip(size * (pageNo - 1))
    .then((data)=>
    {
        // res.send(response)
        var pages = Math.ceil(total / size);
        console.log(total);
        res.json({ 'message':data, 'page': pages })

    }).catch((err)=>
    {
        res.status(404).send({
            message: err.message || "Some error occured while Fetching Data From database"
        });
    })
})
}

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
            message: "Note content can not be empty"
        });
    }

    jobs.update({ '_id': req.body.id }, {$set: req.body,"time" :(new Date()).getTime()}, { new: true }, (err, response) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(response);
        }
    });
}