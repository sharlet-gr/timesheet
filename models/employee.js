var mongoose=require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
require('./project');
var Project = mongoose.model('Project');
var employeeSchema = mongoose.Schema({
	username:{type: String, required: true, unique: true},
	name:{type: String, required: true},
	password:{type: String, required: true},
	projects:[{type: mongoose.Schema.Types.ObjectId,ref:'Project'}],
	tasks: [{
		project: {type: mongoose.Schema.Types.ObjectId,ref:'Project'},
		time: String,
		day: {type:Date,default:Date.now}
	}]
});
employeeSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
employeeSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('Employee', employeeSchema);
