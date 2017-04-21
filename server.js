//Dependencies
//set up express server
var express = require("express");
var PORT = process.env.PORT || 3000;
var app = express();

//set up other npm
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
//session ensures one client-server connection and encrypted. 
var session = require('express-session');
var passport = require("passport");
var flash = require('connect-flash');
var path = require('path');

var mongoose = require('mongoose');


mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost/login');


SALT_WORK_FACTOR = 12;

//middleware used for development
// Serve static content for the app from the "views" directory in the application directory.
app.use(express.static('public'));
app.set(express.static(__dirname + '/views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keep it safe',
				  saveUninitialized: true,
				  resave: true }));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars", "html");

var db = mongoose.connection;
db.on("error", function(error){
    throw error;
});

db.on("open", function(){
    console.log("Mongoose connection successful");

});


// Import routes and give the server access to them.
require("./config/passport")(passport);
require('./controllers/routes.js')(app, passport);

//syncing our sequelize models and then starting express app
app.listen(PORT, function(){
    console.log("App is listening on port", PORT);
});
