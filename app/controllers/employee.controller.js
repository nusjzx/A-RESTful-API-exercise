var Employee = require('../models/employee.model.js');

exports.create = function(req, res) {
    // Create and Save a new Employee
    if(!req.body.id) {
        res.status(400).send({message: "Employee id can not be empty"});
    }
    var employee = new Employee({id: req.body.id, name: req.body.name, age: req.body.age});

    employee.save(function(err, data) {
        console.log(data);
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the Employee."});
        } else {
            res.send(data);
        }
    });
};

exports.findAll = function(req, res) {
    /// Retrieve and return all employees from the database.
    Employee.find(function(err, employees){
        if(err) {
            res.status(500).send({message: "Some error occurred while retrieving employees."});
        } else {
            res.send(employees);
        }
    });

};

exports.findOne = function(req, res) {
    // Find a single employee with a employeeId
    Employee.findOne({ id: req.params.employeeId }, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not retrieve employee with id " + req.params.employeeId});
        } else {
            res.send(data);
        }
    });

};

exports.update = function(req, res) {
    // Update a employee identified by the employeeId in the request
    Employee.findOne({ id: req.params.employeeId }, function(err, employee) {
        if(err) {
            res.status(500).send({message: "Could not find a employee with id " + req.params.employeeId});
        }

        employee.name = req.body.name;
        employee.age = req.body.age;

        employee.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update employee with id " + req.params.employeeId});
            } else {
                res.send(data);
            }
        });
    });

};

exports.delete = function(req, res) {
    // Delete a employee with the specified noteId in the request
    Employee.remove({id: req.params.employeeId}, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not delete employee with id " + req.params.employeeId});
        } else {
            res.send({message: "employee deleted successfully!"})
        }
    });

};