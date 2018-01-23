var mongoose = require('mongoose');

var EmployeeSchema = mongoose.Schema({
	id: Number,
    name: String,
   	age: Number
}, { id: false });

module.exports = mongoose.model('Employee', EmployeeSchema);