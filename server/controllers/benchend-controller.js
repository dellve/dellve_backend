var zmq = require('zmq');
var pub = zmq.socket('pub');

/**
 * Controller constructor.
 *
 * @class      Controller (name)
 * @param      {Number}  zmqPort  Public TCP port.
 */
function Controller(zmqPort) {
  /**
   * Asynchronous API callback
   */
  this.callbacks = {
    getBenchmarkInfo: {},
    getBenchmarkMetrics: {}
  }

  /**
   * ZeroMQ port number (5555 by default)
   */
  this.zmqPort = zmqPort || 5555; // TODO: get zmqPort through config API instead!
}

/**
 *  Connects to ZeroMQ socket.
 */
Controller.prototype.connect = function() {
  pub.bindSync('tcp://*:' + this.zmqPort);
}

/**
 * Disconnects from ZeroMQ socket.
 */
Controller.prototype.disconnect = function() {
  pub.unbindSync('tcp:*:' + this.zmqPort);
}

/**
 * Gets the benchmark info.
 *
 * @param      {Number}    serverId  Server ID
 * @param      {Function}  callback  Data receiver callback.
 * @param      {Boolean}   once      If true, callback will be called only once (default=true)
 *
 */
Controller.prototype.getBenchmarkInfo = function(serverId, callback, once) {
  // TODO: Register callback
  //
  // TODO: implement this with ZMQ...
  //
  //       1. If the info isn't stored on backend, tell benchend to provide it
  //          (Side note: ideally, benchend would provide info upon start up)
  //       2. If the info is here, pass it to callback.
  //
}

 /**
  * Sets the benchmark information.
  *
  * @param      {Number}  serverId  Server ID
  * @param      {Object}  data      Decoded JSON object containing benchmark info
  */
Controller.prototype.setBenchmarkInfo = function(serverId, data) {
  // TODO: Store and propagate data.
  //
  //       1. Store data (in memory, or in DB, we can decide later)
  //       2. If there are any callbacks waiting for data,
  //          call them in order (i.e. think callback FIFO)
};

/**
 * Gets the benchmark metrics.
 *
 * @param      {Number}    serverId     Server ID
 * @param      {Number}    benchmarkId  Benchmark ID
 * @param      {Function}  callback     Data receiver callback
 * @param      {Boolean}   once         If true, callback will be called only once (default=false)
 */
Controller.prototype.getBenchmarkMetrics = function(serverId, benchmarkId, callback, once) {
  // TODO: Register callback
  //
  // TODO: implement the following with ZMQ...
  //
  //       1. Tell benchend to begin metric stream
  //       2. Receive metric stream via REST API (sometime later...)
  //       3. Propagate metric stream using callback(s)
  //
}

/**
 * Sets the benchmark metrics.
 *
 * @param      {Number}  serverId     Server ID
 * @param      {Number}  benchmarkId  Benchmark ID
 * @param      {Object}  data         Decoded JSON object containing benchmark metric data
 */
Controller.prototype.setBenchmarkMetrics = function(serverId, benchmarkId, data) {
  // TODO: Store and propagate data
  //
  //       1. Store data (in memory, or in DB, we can decide later)
  //       2. If there are any callbacks waiting for data,
  //          call them in order (i.e. think callback FIFO)
};

/**
 * Starts a benchmark.
 *
 * @param      {Number}  serverId     Server ID
 * @param      {Number}  benchmarkId  Benchmark ID
 */
Controller.prototype.startBenchmark = function(serverId, benchmarkId) {
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
Controller.prototype.stopBenchmark = function(serverId, benchmarkId) {
  // TODO: implement this with ZMQ...
  //
  //       1. Ask benchend to stop a particular benchmark
  //
}

module.exports = Controller;
