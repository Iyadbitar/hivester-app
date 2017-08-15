var express = require('express');
var config = require('../config/server.config');
// var session = require('express-session');
var router = require('express').Router();

module.exports = function(app) {
  'use strict';

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

  app.use('/', express.static(process.cwd() + '/../client'));
  app.use('/api/export', require('./routes/export/export.router'))

  return router;

};
