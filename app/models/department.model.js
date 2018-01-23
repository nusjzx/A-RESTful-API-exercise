var mongoose = require('mongoose');

var DepartmentSchema = mongoose.Schema({
	id: Number,
    name: String,
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }]
}, { id: false });

module.exports = mongoose.model('Department', DepartmentSchema);