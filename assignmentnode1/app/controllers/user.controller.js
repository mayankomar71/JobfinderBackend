const Users = require('../models/model.js');
const myenum = require('./enum')

// Create and Save a new Trainee
exports.create = (req, res) => {

    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Data content can not be empty"
        });
    }
    let role = req.body.role;
    role = myenum[role];

    const newUser = new Users.User({
        user_id: req.body.user_id,
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        role: role,
        loc: req.body.loc
    });
    newUser.save((err, response) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while Posting Data to database"
            });
        }
        else {
            res.send(response)
        }
    })


};

// Retrieve and return all data from the database.
exports.findAll = (req, res) => {
    Users.User.find((err, response) => {
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

exports.findOne = (req, res) => {
    Users.User.findOne({ 'name': req.params.name }, (err, response) => {
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


exports.delete = (req, res) => {
    Users.User.findOneAndDelete({ 'user_id': req.params.id }, (err, response) => {
        if (err) {
            res.status(404).send({
                message: err.message || "Some error occured while Deleting Data From database"
            });
        }
        else {

            res.send({Message:"doc deleted successfully"});
        }

    })


};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
	// Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    Users.User.findOneAndUpdate({'user_id':req.params.id}, {$set: req.body}, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.id
        });
    });
};