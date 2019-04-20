
module.exports = (app) => {
    const data = require('../controllers/user.controller.js');
    const job=require('../controllers/job.controller');
    const apply=require('../controllers/apply.controller');
    
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

    app.post('/apply/:id',apply.create)

    app.get('/applied/:id',apply.findOne)
    
    app.put('/applyedit/:id',apply.update)
    

}