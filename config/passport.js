'use strict'


// BCRYPT MAY BE BUSTED - SUSPECT IT FIRST FOR PROBLEMS
var bcrypt = require('bcrypt-nodejs');
var localStrategy = require('passport-local').Strategy;

var User = require('../models/User.js');
// var configAuth = require('./auth');




module.exports = function(passport){
		passport.serializeUser(function(user, done){
			done(null, user._id);
		});

		passport.deserializeUser(function(user, done){
      // CHANGE TO MONGODB MODEL
        console.log(user);
			User.findOne({'_id': user}, '_id, email, password', function(err, user){
                if(err) console.log(err);
                if(user){
                    console.log(user);
                    done(null, user);
                }else{
                    console.log("CAN'T DESERIALIZE");
                    console.log(user);
                    done(null, user);
                }
				
			});
		});

// For Authentication Purposes
	passport.use("local-signup", new localStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	},function(req, username, password, done){
		var user = new User({
            email: username,
            password: password
        });

        user.save(function(err, doc){
            console.log('user saved');
        })
        

	}
));

passport.use('local-login', new localStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req, email, password, done){
		  console.log("LOGIN FUNCTION");
			//Search MONGO DB TO LOGIN
 
            console.log("LOGGED IN YAY");

            User.findOne({
                email: email,
                password: password
            }, '_id, email', function(err, doc){
                if(err) console.log(err)
                if(doc === null){
                    console.log("HOUSTON, WE HAVE A PROBLEM");
                    return done(null, false, req.flash('loginMessage', 'Problem with username or password'));
                }else{
                    console.log("WE HAVE LANDED");
                    console.log(doc);
                    return done(null, doc);
                }  
            });
		}
	));

};