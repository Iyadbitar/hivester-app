const DatabaseService = require('./database.service');
const db = new DatabaseService();

function ActionsService() { }

ActionsService.prototype.collection = db.get('actions', { castIds: false });

ActionsService.prototype.get = function(what, config) {
  return this.collection.find(what, config);
}

ActionsService.prototype.getOne = function(what) {
  return this.collection.findOne(what);
}

ActionsService.prototype.getById = function(id) {
  return this.collection.findOne({ _id: id })
}

ActionsService.prototype.getByWorkspace = function(id, what) {
  return this.collection.find({ workspace: id }, what);
}

ActionsService.prototype.close = function() {
  db.close();
}

module.exports = ActionsService;
