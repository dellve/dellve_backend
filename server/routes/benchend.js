var express = require('express');
var BenchendRoute = express.Router();
var BenchendController = require('../controllers/benchend-controller');

var benchend = new BenchendController();

benchend.start();
process.on('SIGINT', function () {
  benchend.stop();
});

// TODO: define benchend API REST end-point here
//
// For example:
//
//       router.get('/', function(req, res, next) {
//         res.render('Benchend API');
//       });
//
// Note: Essentially, we need to map this route's API into that
//       of 'benchend-controller' (which you can find in ../controllers/)

BenchendRoute.get('/', function(req, res) {
  res.send('Benchend Main');
});

BenchendRoute.post('/server/:id', function(req, res) {
  res.send('Posted: ' + req.params['id']);
});

BenchendRoute.get('/server/:serverId/benchmark/:benchmarkId/start', function(req, res) {
  benchend.startBenchmark(req.params['serverId'], req.params['benchmarkId']);
  res.sendStatus(200);
});

BenchendRoute.get('/server/:serverId/benchmark/:benchmarkId/stop', function(req, res) {
  benchend.stopBenchmark(req.params['serverId'], req.params['benchmarkId']);
  res.sendStatus(200);
});

module.exports = BenchendRoute;
