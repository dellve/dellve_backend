var zmq = require('zeromq');
var pub = zmq.socket('pub');
var sub = zmq.socket('sub');

var monitor = require('../helpers/zeromq-monitor.js');
var pubMonitor = new monitor(pub);
var subMonitor = new monitor(sub);

function renderMessage(serverId, messageType, messageData) {
  return serverId.toString() + ' ' + messageType.toString() + ' ' + JSON.stringify(messageData);
}

/**
 * ZMQBenchendMessenger constructor.
 * Used to send/receive messages from the benchend server.
 * TODO: Make this a singleton
 *
 * @access     public
 * @class      ZMQBenchendMessenger ()
 */
function ZMQBenchendMessenger() {
  this.pubAddr = 'tcp://' + process.env.ZMQ_PUB_HOST + ':' + process.env.ZMQ_PUB_PORT;
  this.subAddr = 'tcp://' + process.env.ZMQ_SUB_HOST + ':' + process.env.ZMQ_SUB_PORT;

  sub.on('message', function(data) {
    // TODO: dispatch data, probably to a model class
  });
}

/**
 *  Starts benchend service endpoint.
 */
ZMQBenchendMessenger.prototype.start = function() {
  pubMonitor.start();
  pub.bind(this.pubAddr, function(err) {
    if (err) {
      console.log(err);
    }
  });

  sub.connect(this.subAddr);
}

/**
 * Stops benchend service endpoint.
 */
ZMQBenchendMessenger.prototype.stop = function() {
  pubMonitor.stop();
  pub.unbind(this.pubAddr);

  sub.disconnect(this.subAddr);
}
/**
 * Sends a message to the benchend.
 * @param      {Number}      serverId     Server ID of server to send message to
 * @param      {String}      messageType  Message type
 * @param      {Dictionary}  messageData  Message data dictionary
 */
ZMQBenchendMessenger.prototype.sendMessage = function(serverId, messageType, messageData) {
  var message = renderMessage(serverId, messageType, messageData);
  console.log('SEND: ' + message);
  pub.send(message);
}

module.exports = ZMQBenchendMessenger
