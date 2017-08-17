var router = require('express').Router();
var Controller = require('./workspace.controller');
var WorkspaceController = new Controller();

function WorkspaceRouter(wsInstance){
  return router.get('/', function(req, res, next){
    WorkspaceController.start(req, res, next, wsInstance);
  });
}
module.exports = WorkspaceRouter;
