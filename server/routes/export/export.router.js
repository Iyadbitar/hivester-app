var router = require('express').Router();
var Controller = require('./export.controller');
var ExportController = new Controller();

router.get('/:exportSet', function(req, res){
  ExportController.start(req, res);
});


module.exports = router;
