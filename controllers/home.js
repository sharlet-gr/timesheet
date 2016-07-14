var mongoose=require('mongoose');
require('../models/employee');
var Employee= mongoose.model('Employee');
module.exports = function(app){
	app.get('/home', function (req, res) {
	    res.json(req.user);
	});

	app.param('projectId',function(req,res,next,projectId){
		req.projectId=projectId;
		return next();
	});
	app.post('/project/:projectId/time',function(req,res,next){
		req.user.tasks.push({project:req.projectId,time:req.body.time});
		req.user.save(function(err,employee){
			if (err) {
				return err;
			}
			return res.json(employee);
		})
		// console.log(req.user._id);
	});
}