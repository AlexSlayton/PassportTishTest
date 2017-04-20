'use strict'


// BCRYPT MAY BE BUSTED - SUSPECT IT FIRST FOR PROBLEMS
var bcrypt = require('bcrypt-nodejs');
var localStrategy = require('passport-local').Strategy;

var db = require('../login');
var configAuth = require('./auth');

module.exports = function(passport){
		passport.serializeUser(function(user, done){
			done(null, user.id);
		});

		passport.deserializeUser(function(user, done){
      // CHANGE TO MONGODB MODEL
			db.User.find({where: {id: user.id}}).then(function(user){
				done(null, user);
			}).error(function(err){
				done(err, null)
			});
		});

// For Authentication Purposes
	passport.use("local-signup", new localStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	},function(req, username, password, done){
		console.log("Create Sign UP")

	}
));

passport.use('local-login', new localStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req, email, password, done){
		  console.log("LOGIN FUNCTION");
			//Search MONGO DB TO LOGIN
		}
	));

};