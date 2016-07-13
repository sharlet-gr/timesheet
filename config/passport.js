var LocalStrategy = require('passport-local').Strategy;    
var mongoose=require('mongoose');
var Employee = require('../models/employee');;
module.exports = function(passport){
	// used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        Employee.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {
	        // we are checking to see if the user trying to login already exists
	        Employee.findOne({ username :  username }, function(err, employee) {
	            // if there are any errors, return the error
	            if (err)
	                return done(err);
	            // check to see if theres already a user with that username
	            if (employee) {
	                console.log("the username already exists");
	                return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
	            } 
	            else {

	                // if there is no user with that username
	                // create the user
	                var newEmployee = new Employee();
	                // set the user's local credentials
	                newEmployee.username = username;
	                newEmployee.password = newEmployee.generateHash(password);
	                newEmployee.name = req.body.name;
	                // save the user
	                newEmployee.save(function(err) {
	                    if (err)
	                        throw err;
	                    return done(null, newEmployee);
	                });
	            }

	        });    
        });
    }));

    passport.use('local-login', new LocalStrategy({
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) { // callback with username and password from our form

        // find a user whose username is the same as the form's username
        // we are checking to see if the user trying to login already exists
        Employee.findOne({ username :  username }, function(err, employee) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);
            // if no user is found, return the message
            if (!employee)
            {
            	console.log('This username does not exist');
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
            }
            // if the user is found but the password is wrong
            if (!employee.validPassword(password))
            {
            	console.log('Invalid password');
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
            }
            // all is well, return successful user
            console.log('Login Successful');
            return done(null, employee);
        });

    }));

}