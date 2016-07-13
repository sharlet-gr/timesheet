module.exports = function(app, passport){
	app.get('/', function (req, res) {
	    res.json(req.user);
	});

	//app.post('/login');

	app.get('/register', function(req, res) {
	    res.json(req.user);
	});

	app.post('/register', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/register', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));	

	app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
}

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}
