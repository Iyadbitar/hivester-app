var express = require('express');
var config = require('../config/server.config');
// var session = require('express-session');
var router = require('express').Router();
var expressWs = require('express-ws');

module.exports = function(app) {
  'use strict';


  const wsInstance = expressWs(app);
  app.ws('/notifications', function(ws, req) {
    ws.on('message', function(msg) {
      console.log(msg)
      ws.send(msg);
    });
  });

  app.use(function(req, res, next) {

    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type');

    if (req.method == 'OPTIONS' ) {
      res.status(200).send();
    }
    else {
      next();
    }

  });

  app.use('/', express.static(process.cwd() + '/../client/dist'));
  app.use('/api/export', require('./routes/export/export.router')(wsInstance));
  app.use('/api/login', require('./routes/login/login.router')(wsInstance));
  app.use('/api/workspace', require('./routes/workspace/workspace.router')(wsInstance));


  return router;

};
