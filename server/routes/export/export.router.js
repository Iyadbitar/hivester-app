var router = require('express').Router();
var Controller = require('./export.controller');
var ExportController = new Controller();

function ExportRouter(wsInstance){
  router.get('/start/:exportSet', function(req, res, next){
    ExportController.start(req, res, next, wsInstance);
  });

  router.get('/download', function(req, res, next){
    ExportController.download(req, res, next, wsInstance);
  });

  return router;
}
module.exports = ExportRouter;
