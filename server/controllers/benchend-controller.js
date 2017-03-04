var zmq = require('zeromq');
var pub = zmq.socket('pub');
var sub = zmq.socket('sub');

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
}

/**
 *  Starts benchend service endpoint.
 */
BenchendController.prototype.start = function() {
  console.log('START PUB tcp://' +
    (process.env.ZMQ_PUB_HOST || '*') + ':' +
    (process.env.ZMQ_PUB_PORT || '5556'));
  console.log('START SUB tcp://' +
    (process.env.ZMQ_SUB_HOST || 'localhost') + ':' +
    (process.env.ZMQ_SUB_PORT || '5555'));
  // TODO: consider async alternatives to bindSync
  pub.bind('tcp://' +
    (process.env.ZMQ_PUB_HOST || '*') + ':' +
    (process.env.ZMQ_PUB_PORT || '5556'))
  sub.connect('tcp://' +
    (process.env.ZMQ_SUB_HOST || 'localhost') + ':' +
    (process.env.ZMQ_SUB_PORT || '5555'));
}

/**
 * Stops benchend service endpoint.
 */
BenchendController.prototype.stop = function() {
  console.log('STOP PUB tcp://' + process.env.ZMQ_PUB_HOST + ':' + process.env.ZMQ_PUB_PORT);
  console.log('STOP SUB tcp://'  + process.env.ZMQ_SUB_HOST + ':' + process.env.ZMQ_SUB_PORT);
  // TODO: consider async alternatives to unbindSync
  pub.unbind('tcp://' + process.env.ZMQ_PUB_HOST + ':' + process.env.ZMQ_PUB_PORT);
  sub.disconnect('tcp://' + process.env.ZMQ_SUB_HOST + ':' + process.env.ZMQ_SUB_PORT);
}

/**
 * Starts the metric stream from a particular server.
 *
 * @param      {Number}  serverId     Server ID
 */
BenchendController.prototype.startMetricStream = function(serverId) {
  // TODO: implement this with ZMQ...
  //
  //       1. Ask benchend to run a particular benchmark
  //
}

/**
 * Stops the metric stream from a particular server.
 *
 * @param      {Number}  serverId     Server ID
 */
BenchendController.prototype.stopMetricStream = function(serverId) {
  // TODO: implement this with ZMQ...
  //
  //       1. Ask benchend to stop a particular benchmark
  //
}

/**
 * Starts a benchmark.
 *
 * @param      {Number}  serverId     Server ID
 * @param      {Number}  benchmarkId  Benchmark ID
 */
BenchendController.prototype.startBenchmark = function(serverId, benchmarkId) {
  // TODO: implement this with ZMQ...
  //
  //       1. Ask benchend to run a particular benchmark
  //
  console.log('Server ' + serverId + ', Benchmark ' + benchmarkId + ' START');
  sendMessage(serverId, 'startBenchmark', {benchmarkId: benchmarkId});
}

/**
 * Stops a benchmark.
 *
 * @param      {Number}  serverId     Server ID
 * @param      {Number}  benchmarkId  Benchmark ID
 */
BenchendController.prototype.stopBenchmark = function(serverId, benchmarkId) {
  // TODO: implement this with ZMQ...
  //
  //       1. Ask benchend to stop a particular benchmark
  //
  console.log('Server ' + serverId + ', Benchmark ' + benchmarkId + ' STOP');
  sendMessage(serverId, 'stopBenchmark', {benchmarkId: benchmarkId});
}

module.exports = BenchendController;
