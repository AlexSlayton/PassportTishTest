var db= require('../models');
var path = require ("path");

//create method to authenticate the datapage
function isAuthenticated(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}

	res.redirect('/')
}

module.exports = function(app, passport){
	app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/index.html"));
  	});

	app.get("/login", function(req, res) {
			console.log(req.flash());
			console.log('LOG IN ROUTE');
    	res.sendFile(path.join(__dirname, "../views/index.html"));
  	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/datapage',
		failureRedirect: '/login',
		failureFlash: true
	}));

	app.get("/signup", function(req, res) {
			console.log(req.flash());
			console.log('signup route');
    	res.render("signup");
  	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/datapage',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	app.get('/datapage', isAuthenticated, function(req, res){
		console.log('DATAPAGE')
		res.render('datapage', { user: req.user });
	});


	//logout 
	app.get('/logout', function(req, res){
		req.logout();
		req.session.destroy();
		res.redirect('/login');
	})
};