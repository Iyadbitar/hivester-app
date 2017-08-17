const DatabaseService = require('./database.service');
const db = new DatabaseService();

function ProjectsService() { }

ProjectsService.prototype.collection = db.get('projects', { castIds: false });

ProjectsService.prototype.get = function(object, config) {
  return this.collection.find(object, config);
}

ProjectsService.prototype.getById = function(id, config) {
  return this.collection.findOne({ _id: id }, config);
}

ProjectsService.prototype.getByWorkspace = function(workspaceId, config) {
  return this.collection.find({ workspace: workspaceId }, config)
}

ProjectsService.prototype.close = function() {
  db.close();
}

module.exports = ProjectsService;
