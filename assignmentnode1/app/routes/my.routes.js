
module.exports = (app) => {
    const data = require('../controllers/user.controller.js');
    const job = require('../controllers/job.controller');
    const apply = require('../controllers/apply.controller');
    const postImg = require('../controllers/imagecontroller')

    // Create a new record
    app.post('/user', data.create);

    // Retrieve all Trainees
    app.get('/userdetails', data.findAll);

    app.post('/getuser', data.findOne);

    // Update a Note with noteId
    app.put('/userupdate/:id', data.update);

    app.delete('/userdelete/:id', data.delete);

    app.post('/postjob', job.create);

    app.get('/jobs/:page', job.findAll);

    app.get('/jobs/companyjobs/:company/:page',job.company_jobs)

    app.put('/jobupdate', job.update);

    app.delete('/jobupdate/:id', job.deleteOne);

    app.post('/apply', apply.applyjobs)
    
    app.get('/apply/find_applies/:user_id', apply.find_applies);
    //to see available jobs
    // app.get('/jobs/:id', apply.displayjobs)

    // app.get('/applied/:id', apply.findOne)

    app.get('/applied/:companyname', apply.findAll)

    app.put('/apply/put', apply.updatestatus)

    //upload an image using busboy
    app.post('/upload', postImg.postImage)
    //upload image using base64
    app.post('/base64', postImg.base64upload)


}