/**
 * Express.js application instance.
 */

var express = require('express')();
var expressJwt = require('express-jwt');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var path = require('path');

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

express.use(bodyParser.json());
express.use(bodyParser.urlencoded({ extended: false }));
express.use(cookieParser());
express.use(favicon(path.join(__dirname, 'client', 'favicon.ico')));
express.use(logger('dev'));

/**
 * Register routes (and routed middleware)
 */

// express.use('/', function(req, res) {
//   res.send('DELLve - backend!');  // NOTE: this is here to see if server works...
// });

express.use('/benchend', require('./server/routes/benchend'));
// express.use('/benchend', expressJwt); // secure benchend...

module.exports = express;
