var router = require('express').Router();
var Controller = require('./export.controller');
var ExportController = new Controller();

function ExportRouter(wsInstance){
  return router.get('/:exportSet', function(req, res, next){
    ExportController.start(req, res, next, wsInstance);
  });
}
module.exports = ExportRouter;
