
module.exports = (app) => {
    const data = require('../controllers/user.controller.js');
    
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

}