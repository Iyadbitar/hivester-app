const DbConfig = require('../../config/db');
const monk = require('monk');
const mongodb = require('mongodb');

const url = `${DbConfig.server}:${DbConfig.port}/${DbConfig.database}`;
const db = monk(url);

let instance;

function DatabaseService() {
  if(false === !!instance) {
    instance = this;
  }
  return instance;
}

DatabaseService.prototype.db = db;

DatabaseService.prototype.ObjectID = monk.id;

module.exports = DatabaseService;
