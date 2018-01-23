var express = require('express');
var bodyParser = require('body-parser');

// create express app
var app = express();


// Configuring the database
var dbConfig = require('./config/database.config.js');
var mongoose = require('mongoose');

mongoose.connect(dbConfig.url);

mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
})

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/', function(req, res){
    res.json({"message": "Welcome to employee application. "});
});

// Require Employees, Departments routes
require('./app/routes/employee.routes.js')(app);
require('./app/routes/department.routes.js')(app);


app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

// listen for requests
app.listen(3000, function(){
    console.log("Server is listening on port 3000");
});