const DatabaseService = require('./database.service');
const db = new DatabaseService();

function WorkspacesService() { }

WorkspacesService.prototype.collection = db.get('workspaces', { castIds: false });

WorkspacesService.prototype.get = function(object, config) {
  return this.collection.find(object, config);
}

WorkspacesService.prototype.getById = function(id, config) {
  return this.collection.findOne({ _id: id }, config);
}

WorkspacesService.prototype.close = function() {
  db.close();
}

module.exports = WorkspacesService;
