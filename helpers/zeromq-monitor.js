function ZMQMonitor(ZMQSocket) {
  this.socket = ZMQSocket;

  // Register monitoring events
  this.configureMonitor();
}

ZMQMonitor.prototype.configureMonitor = function() {
  this.socket.on('listen', function(fd, ep) {
    console.log('Successfuly binded to:', ep);
  });

  this.socket.on('bind_error', function(fd, ep) {
    console.log('Encountered error when binding to:',  ep);
  });

  this.socket.on('accept', function(fd, ep) {
    console.log('Accepted a connection from a remote peer at:', ep);
  });

  this.socket.on('close', function(fd, ep) {
    console.log('Socket closed:', ep);
  });

  this.socket.on('disconnect', function(fd, ep) {
   console.log('Unexpected disconnect from a remote peer at:', ep);
  });
}

ZMQMonitor.prototype.start = function() {
  // Handle monitor error
  this.socket.on('monitor_error', function(err) {
    console.log('Error in monitoring: %s, will restart', err);
    this.socket.monitor(500, 0);
  });

  // Start monitoring
  this.socket.monitor(500, 0);
}

ZMQMonitor.prototype.stop = function() {
  this.socket.unmonitor();
}

module.exports = ZMQMonitor
