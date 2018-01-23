var Department = require('../models/department.model.js');
var Employee = require('../models/employee.model.js')

exports.create = function(req, res) {
    // Create and Save a new Department
    if(!req.body.id) {
        res.status(400).send({message: "Department id can not be empty"});
    }
    var department = new Department({id: req.body.id, name: req.body.name});

    department.save(function(err, data) {
        console.log(data);
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the Department."});
        } else {
            res.send(data);
        }
    });
};

exports.findAll = function(req, res) {
    /// Retrieve and return all departments from the database.
    Department.find(function(err, departments){
        if(err) {
            res.status(500).send({message: "Some error occurred while retrieving departments."});
        } else {
            res.send(departments);
        }
    });

};

exports.findOne = function(req, res) {
    // Find a single department with a departmentId
    Department.findOne({ id: req.params.departmentId }, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not retrieve department with id " + req.params.departmentId});
        } else {
            res.send(data);
        }
    });

};

exports.update = function(req, res) {
    // Update a department identified by the departmentId in the request
    Department.findOne({ id: req.params.departmentId }, function(err, department) {
        if(err) {
            res.status(500).send({message: "Could not find a department with id " + req.params.departmentId});
        }

        department.name = req.body.name;

        department.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update department with id " + req.params.departmentId});
            } else {
                res.send(data);
            }
        });
    });

};

exports.delete = function(req, res) {
    // Delete a department with the specified noteId in the request
    Department.remove({id: req.params.departmentId}, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not delete department with id " + req.params.departmentId});
        } else {
            res.send({message: "department deleted successfully!"})
        }
    });

};

exports.show = function(req, res) {
    Department.findOne( { id: req.params.departmentId}).
                populate('employees').
                exec(function (err, employees) {
                        if(err) {
                            res.status(500).send({message: "Could not find department with id " + req.params.departmentId});
                        } else {
                            res.send(employees);
                        }
                     });
}

exports.addMapping = function(req, res) {
    Department.findOne( { id: req.params.departmentId}, function(err, department) {
        if(err) {
            res.status(500).send({message: "Could not find a department with id " + req.params.departmentId});
        } else {
            Employee.findOne( { id: req.params.employeeId } , function(err, employee) {
                if(err) {
                    res.status(500).send({message: "Could not find a employee with id " + req.params.employeeId});
                } else {
                    department.update({ "$push": { "employees": employee._id } }, function(err, data){
                        if(err) {
                            res.status(500).send({message: "Could not update department with id " + req.params.departmentId});
                        } else {
                            res.send({message: "successfully add the mapping between employee with id " + req.params.employeeId + 
                                               " and department with id " + req.params.departmentId});
                        }
                    });
                }
            });
        }
    });
}