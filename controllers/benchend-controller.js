var zmq = require('zeromq');
var pub = zmq.socket('pub');
var sub = zmq.socket('sub');

var monitor = require('../helpers/zeromq-monitor.js');
var pubMonitor = new monitor(pub);
var subMonitor = new monitor(sub);

function renderMessage(serverId, messageType, messageData) {
  return serverId.toString() + ' ' + messageType.toString() + ' ' + JSON.stringify(messageData);
}

function sendMessage(serverId, messageType, messageData) {
  console.log('SEND: ' + renderMessage(serverId, messageType, messageData));
  pub.send(renderMessage(serverId, messageType, messageData));
}

/**
 * BenchendController constructor.
 *
 * @access     public
 * @class      BenchendController (name)
 */
function BenchendController(userCallbacks) {
  /**
   * Asynchronous API callback
   */

  this.callbacks = userCallbacks;

  sub.on('message', function(data) {
    // TODO: dispatch data to private methods and user callbacks
  });
  this.pubAddr = 'tcp://' + process.env.ZMQ_PUB_HOST + ':' + process.env.ZMQ_PUB_PORT;
  this.subAddr = 'tcp://' + process.env.ZMQ_SUB_HOST + ':' + process.env.ZMQ_SUB_PORT;
}

/**
 *  Starts benchend service endpoint.
 */
BenchendController.prototype.start = function() {
  pubMonitor.start();

  pub.bind(this.pubAddr, function(err) {
 	if (err) console.log(err);
  });
  sub.connect(this.subAddr);
}

/**
 * Stops benchend service endpoint.
 */
BenchendController.prototype.stop = function() {
  pubMonitor.stop();

  pub.unbind(this.pubAddr);
  sub.disconnect(this.subAddr);
}

/**
 * Starts the metric stream from a particular server.
 *
 * @param      {Number}  serverId     Server ID
 */
BenchendController.prototype.startMetricStream = function(serverId) {
  sendMessage(serverId, 'startMetricStream', {});
}

/**
 * Stops the metric stream from a particular server.
 *
 * @param      {Number}  serverId     Server ID
 */
BenchendController.prototype.stopMetricStream = function(serverId) {
  sendMessage(serverId, 'stopMetricStream', {});
}

/**
 * Starts a benchmark.
 *
 * @param      {Number}  serverId     Server ID
 * @param      {Number}  benchmarkId  Benchmark ID
 */
BenchendController.prototype.startBenchmark = function(serverId, benchmarkId) {
  sendMessage(serverId, 'startBenchmark', {benchmarkId: benchmarkId});
}

/**
 * Stops a benchmark.
 *
 * @param      {Number}  serverId     Server ID
 * @param      {Number}  benchmarkId  Benchmark ID
 */
BenchendController.prototype.stopBenchmark = function(serverId, benchmarkId) {
  sendMessage(serverId, 'stopBenchmark', {benchmarkId: benchmarkId});
}

module.exports = BenchendController;
