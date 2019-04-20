const Users = require('../models/usermodel');
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
    role = myenum.roles[role];

    const newUser = new Users({
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
    Users.find((err, response) => {
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
    Users.findOne({ 'name': req.params.name }, (err, response) => {
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
    Users.findOneAndDelete({ 'user_id': req.params.id }, (err, response) => {
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

// Update a Data identified by the Id in the request
exports.update = (req, res) => {
	// Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Data content can not be empty"
        });
    }

    // Find Data and update it with the request body
    Users.findOneAndUpdate({'user_id':req.params.id}, {$set: req.body}, {new: true})
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