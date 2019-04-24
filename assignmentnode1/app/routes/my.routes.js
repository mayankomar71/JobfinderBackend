
module.exports = (app) => {
    const data = require('../controllers/user.controller.js');
    const job = require('../controllers/job.controller');
    const apply = require('../controllers/apply.controller');
    const postImg = require('../controllers/imagecontroller')

    // Create a new record
    app.post('/user', data.create);

    // Retrieve all Trainees
    app.get('/userdetails', data.findAll);

    // Retrieve a single Note with noteId
    app.get('/data/:name', data.findOne);

    // Update a Note with noteId
    app.put('/userupdate/:id', data.update);

    // Delete a Note with noteId
    app.delete('/userdelete/:id', data.delete);

    app.post('/jobs/:id', job.create);

    app.get('/jobs', job.findAll);

    app.put('/jobupdate/:id', job.update);

    app.delete('/jobupdate/:id', job.deleteOne);

    app.post('/apply/:id', apply.applyjobs)
    //to see available jobs
    app.get('/jobs/:id', apply.displayjobs)

    app.get('/applied/:id', apply.findOne)

    app.get('/applied/:companyname', apply.findAll)

    app.put('/applyedit/:company_id/:user_id', apply.update_status)

    //upload an image using busboy
    app.post('/upload', postImg.postImage)
    //upload image using base64
    app.post('/base64', postImg.base64upload)


}