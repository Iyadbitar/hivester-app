const DatabaseService = require('./database.service');
const db = new DatabaseService();

function AdminsService() { }

AdminsService.prototype.collection = db.get('admins', { castIds: false });

AdminsService.prototype.get = function(object, config) {
  return this.collection.find(object, config);
}

AdminsService.prototype.getByCreds = function(creds) {
  return this.collection.findOne({email: creds.email, password: creds.password}, '-password');
}

AdminsService.prototype.close = function() {
  db.close();
}

module.exports = AdminsService;
