var zmq = require('zmq');
var pub = zmq.socket('pub');
var sub = zmq.socket('sub');

/**
 * BenchendService constructor.
 *
 * @access     public
 * @class      BenchendService (name)
 */
function BenchendService(userCallbacks) {
  /**
   * Asynchronous API callback
   */

  this.callbacks = userCallbacks;

  function renderMessage(serverId, messageType, messageData) {
    return serverId.toString() + ' ' + messageType.toString() + ' ' + messageData.toString();
  }

  function sendMessage(serverId, messageType, messageData) {
    pub.send(this.renderMessage(serverId, messageType, messageData));
  }

  sub.on('message', function(data) {
    // TODO: dispatch data to private methods and user callbacks
  });
}

/**
 *  Starts benchend service endpoint.
 */
BenchendService.prototype.start = function() {
  // TODO: consider async alternatives to bindSync
  pub.bindSync('tcp://' + process.env.ZMQ_PUB_HOST + ':' + process.env.ZMQ_PUB_PORT);
  sub.connect('tcp://'  + process.env.ZMQ_SUB_HOST + ':' + process.env.ZMQ_SUB_PORT);
}

/**
 * Stops benchend service endpoint.
 */
BenchendService.prototype.stop = function() {
  // TODO: consider async alternatives to unbindSync
  pub.unbindSync('tcp://' + process.env.ZMQ_PUB_HOST + ':' + process.env.ZMQ_PUB_PORT);
  sub.disconnect('tcp://' + process.env.ZMQ_SUB_HOST + ':' + process.env.ZMQ_SUB_PORT);
}

/**
 * Starts the metric stream from a particular server.
 *
 * @param      {Number}  serverId     Server ID
 */
BenchendService.prototype.startMetricStream = function(serverId) {
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
BenchendService.prototype.stopMetricStream = function(serverId) {
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
BenchendService.prototype.startBenchmark = function(serverId, benchmarkId) {
  // TODO: implement this with ZMQ...
  //
  //       1. Ask benchend to run a particular benchmark
  //
}

/**
 * Stops a benchmark.
 *
 * @param      {Number}  serverId     Server ID
 * @param      {Number}  benchmarkId  Benchmark ID
 */
BenchendService.prototype.stopBenchmark = function(serverId, benchmarkId) {
  // TODO: implement this with ZMQ...
  //
  //       1. Ask benchend to stop a particular benchmark
  //
}

module.exports = BenchendService;
