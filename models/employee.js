var mongoose=require('mongoose');
var employeeSchema = new mongoose.Schema({
	name:{type: String, required: true},
	password:{type: String, required: true},
	projects:[{type:mongoose.Schema.Types.ObjectId,ref:'Project'}];
});
mongoose.model('Employee', employeeSchema);
