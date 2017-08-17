const DatabaseService = require('./database.service');
const db = new DatabaseService();

function ExportsService() { }

ExportsService.prototype.collection = db.get('exports', { castIds: false });

ExportsService.prototype.get = function(object, config) {
  return this.collection.find(object, config);
}

ExportsService.prototype.getById = function(id, config) {
  return this.collection.findOne({ _id: id }, config);
}

ExportsService.prototype.insert = function(item) {
  return this.collection.insert(item);
}

ExportsService.prototype.close = function() {
  db.close();
}

module.exports = ExportsService;
