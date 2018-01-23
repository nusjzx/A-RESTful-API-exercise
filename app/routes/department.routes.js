module.exports = function(app) {

    var departments = require('../controllers/department.controller.js');

    // Create a new department
    app.post('/departments', departments.create);

    // Retrieve all department
    app.get('/departments', departments.findAll);

    // Retrieve a single department with departmentId
    app.get('/departments/:departmentId', departments.findOne);

    // Update a department with departmentId
    app.put('/departments/:departmentId', departments.update);

    // Delete a department with departmentId
    app.delete('/departments/:departmentId', departments.delete);

    //show employees of a department
    app.get('/departments/:departmentId/employees', departments.show);

    //add mappings
    app.post('/departments/:departmentId/employees/:employeeId', departments.addMapping)
}