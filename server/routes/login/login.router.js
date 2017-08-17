var router = require('express').Router();
var Controller = require('./login.controller');
var LoginController = new Controller();

function ExportRouter(wsInstance){
  return router.post('/', function(req, res, next){
    LoginController.start(req, res, next, wsInstance);
  });
}
module.exports = ExportRouter;
