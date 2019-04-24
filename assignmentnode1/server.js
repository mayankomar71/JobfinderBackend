const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(express.static(__dirname));

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;

// Connecting to the database 
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to Naukri.com" });
});

// Require Notes routes
require('./app/routes/my.routes.js')(app);

// listen for requests
var server = app.listen(4000, () => {

    var host = "localhost:"
    var port = server.address().port

    console.log('serving backend on ', host, port)

});
