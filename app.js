/**
 * Create Express.js application instance.
 */

var app = require('express')();

/**
 * Pull-in misc module dependencies.
 */

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var path = require('path');

/**
 * Register middleware
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(favicon(path.join(__dirname, 'client', 'favicon.ico')));
app.use(logger('dev'));

/**
 * Register routes
 */

app.use('/', function(req, res) {
  res.send('DELLve - backend!');  // NOTE: this is here to see if server works...
});

app.use('/benchend', require('./server/routes/benchend'));

module.exports = app;
