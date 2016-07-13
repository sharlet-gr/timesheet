var express  = require('express');
var app      = express();                             
var mongoose = require('mongoose');                    
var morgan = require('morgan');             
var bodyParser = require('body-parser');    

// configuration =================

mongoose.connect('mongodb://localhost/timesheet');
require('./models/employee');
require('./models/project');
var Employee = mongoose.model('Employee');
var Project = mongoose.model('Project');

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

// listen (start app with node server.js) ======================================
app.listen(3000);
console.log("App listening on port 3000");