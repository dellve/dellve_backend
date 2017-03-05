/**
 * Express.js application instance.
 */

var express = require('express');
var expressJwt = require('express-jwt');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var path = require('path');

var app = express();

/**
 * Setup JS web-token middleware
 */

// var authenticate = expressJwt({
//   secret: process.env.AUTH0_CLIENT_SECRET,
//   audience: process.env.AUTH0_CLIENT_ID
// });

/**
 * Register middleware
 */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(favicon(path.join(__dirname, 'client', 'favicon.ico')));
app.use(logger('dev'));

/**
 * Register routes (and routed middleware)
 */

// app.use('/', function(req, res) {
//   res.send('DELLve - backend!');  // NOTE: this is here to see if server works...
// });

app.use('/benchend', require('./controllers/benchend'));
// app.use('/benchend', expressJwt); // secure benchend...

module.exports = app;
