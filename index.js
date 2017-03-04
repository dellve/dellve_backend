#!/usr/bin/env node

var app = require('./app');
var debug = require('debug')('dellve-backend:server');
var dotenv = require('dotenv');
var http = require('http');

/**
 * Load environment variables.
 */

dotenv.load('.env');

/**
 * Node.js HTTP server instance.
 */

var server = http.createServer(app);
var port = process.env.PORT || '3000';
app.set('port', port);
server.listen(port);

/**
 * Event listener for HTTP server "error" event.
 */
server.on('error', function (error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});

/**
 * Event listener for HTTP server "listening" event.
 */
server.on('listening', function () {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
});



