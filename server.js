// server.js

// modules =================================================
var express = require('express'),
        app = express(),
        //fs = require('fs'),
        logger = require('morgan'),
        bodyParser = require('body-parser'),
        methodOverride = require('method-override'),
        request = require('request'),
        mongoose  = require('mongoose'),
        //https = require('https'),
        cookieParser = require('cookie-parser'),
        session = require('express-session');
        //passport = require('passport');

// configuration ===========================================

// config files
var db = require('./config/db');

//HTTPS key/certificate
//var config = {
//        key: fs.readFileSync('./key.pem'),
//        cert: fs.readFileSync('./cert.pem')
//};

// set our port
var port = process.env.PORT || 8080;

mongoose.connect('mongodb://localhost/users');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// connect to our mongoDB database
// (uncomment after you enter in your own credentials in config/db.js)
// mongoose.connect(db.url);

//Initialize Morgan
app.use(logger('dev'));

//Initialize Cookie Parser
app.use(cookieParser());

//Initialize Express-Session
app.use(session({
        resave: false,
        saveUninitialized: false,
        secret: 'supercoolproject'
        //cookie: {
        //        secure: true
        //}
}));

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public and /libs
app.use(express.static(__dirname + '/public'));

// routes ==================================================
require('./app/routes')(app); // configure our routes

// error handling ===========================================
app.use(function (err, req, res, next) {
        err.status = err.status || 500;
        res.status(err.status).render('error', {
                error: err
        });
});

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// heyyyy
console.log('Here goes nothin on ' + port);

// expose app
exports = module.exports = app;