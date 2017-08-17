const DatabaseService = require('./database.service');
const db = new DatabaseService();

const cache = { users: {} };

function UsersService() { }

UsersService.prototype.collection = db.get('users', { castIds: false });

UsersService.prototype.get = function(what, config) {
  return this.collection.find(what, config);
}

UsersService.prototype.getById = function(id, config) {
  return this.collection.findOne({ _id: id }, config);
}

UsersService.prototype.getByIds = function(ids, config) {
  let cachedUsers = [];

  // lookc of uncached user and build cachedUsers
  let unCachedUsers = ids.reduce(
    (acc, id) => {
      if(id === 'none' || false === !!id){
        return acc;
      }
      if(cache.users[id]) {
        cachedUsers.push( Object.assign({}, cache.users[id]) );
      }
      else {
        acc.push(id)
      }
      return acc;
    }, []
  );

  // if all users are cached then resolve from cache
  if(unCachedUsers.length < 1) {
    return Promise.resolve(cachedUsers);
  }

  //get uncached user from DB
  return this.collection.find({ _id: { $in: unCachedUsers } }, config)
  .then(
    (users) => {
      // cashe users data in memory
      users.forEach((user) => {
        Object.assign(cache.users, { [user._id]: user })
      });

      // return cached and anuCached users
      return cachedUsers.concat(users);
    }
  )
}

UsersService.prototype.getFullName = function(user) {
  return user && user.profile.firstName && user.profile.lastName
  ? `${user.profile.firstName} ${user.profile.lastName}`
  : 'none';
}

UsersService.prototype.close = function() {
  db.close();
}

module.exports = UsersService;
