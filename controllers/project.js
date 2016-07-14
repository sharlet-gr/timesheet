var mongoose=require('mongoose');
require('../models/employee');
var Employee= mongoose.model('Employee');
var mongoose=require('mongoose');
require('../models/project');
var Project= mongoose.model('Project');
require('../models/employee');
var Employee= mongoose.model('Employee');
module.exports=function(app){
	app.post('/newproject',function(req,res){
		var project = new Project();
		project.name = req.body.name;
		project.save(function(err, project){
			if(err)
				return (err);
			return res.json(project);
		});
	});
	app.param('employee_id',function(req,res,next,employeeId){
		Employee.findById(employeeId,function(err,employee){
			if(err)
				return err;
			req.employee=employee;	
			return next();
		});
	});
	app.param('project_id',function(req,res,next,projectId){
		req.projectId=projectId;
		return next();
	});
	app.post('/employee/:employee_id/:project_id',function(req,res){
		req.employee.projects.push(req.projectId);
		req.employee.save(function(err,employee){
			if(err)
				return err;
			return res.json(employee);
		});
	});
};
