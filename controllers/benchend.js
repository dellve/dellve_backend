var express = require('express');
var BenchendController = express.Router();

var messenger = require('../helpers/zeromq-benchend-messenger');
var messenger = new messenger();

messenger.start();
process.on('SIGINT', function () {
  messenger.stop();
});

BenchendController.post('/server/:id', function(req, res) {
  res.send('Posted: ' + req.params['id']);
});

/**
 * Starts the metric stream from a particular server.
 *
 * @param      {Number}  serverId     Server ID
 */
BenchendController.get('/server/:serverId/startMetricStream', function(req, res) {
  var serverId = req.params['serverId'];
  messenger.sendMessage(serverId, 'startMetricStream', {});
  res.sendStatus(200);
});

/**
 * Stops the metric stream from a particular server.
 *
 * @param      {Number}  serverId     Server ID
 */
BenchendController.get('/server/:serverId/stopMetricStream', function(req, res) {
  var serverId = req.params['serverId'];
  messenger.sendMessage(serverId, 'stopMetricStream', {});
  res.sendStatus(200);
});
/**
 * Starts a benchmark.
 *
 * @param      {Number}  serverId     Server ID
 * @param      {Number}  benchmarkId  Benchmark ID
 */
BenchendController.get('/server/:serverId/benchmark/:benchmarkId/start', function(req, res) {
  var serverId = req.params['serverId'];
  var benchmarkId = req.params['benchmarkId'];
  messenger.sendData(serverId, 'startBenchmark', {benchmarkId: benchmarkId});
  res.sendStatus(200);
});

/**
 * Stops a benchmark.
 *
 * @param      {Number}  serverId     Server ID
 * @param      {Number}  benchmarkId  Benchmark ID
 */
BenchendController.get('/server/:serverId/benchmark/:benchmarkId/stop', function(req, res) {
  var serverId = req.params['serverId'];
  var benchmarkId = req.params['benchmarkId'];
  messenger.sendData(serverId, 'stopBenchmark', {benchmarkId: benchmarkId});
  res.sendStatus(200);
});


module.exports = BenchendController;
