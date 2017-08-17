const DatabaseService = require('./database.service');
const db = new DatabaseService();

const cache = { labels: {} };

function LabelsService() { }

LabelsService.prototype.collection = db.get('labels', { castIds: false });

LabelsService.prototype.get = function(what, config) {
  return this.collection.find(what, config);
}

LabelsService.prototype.getById = function(id, config) {
  return this.collection.findOne({ _id: id }, config);
}

LabelsService.prototype.getByIds = function(ids, config) {
  let cached = [];

  // lookc of uncached label and build cached
  let unCached = ids.reduce(
    (acc, id) => {
      if(id === 'none'){
        return acc;
      }
      if(cache.labels[id]) {
        cached.push( Object.assign({}, cache.labels[id]) );
      }
      else {
        acc.push(id)
      }
      return acc;
    }, []
  );

  // if all labels are cached then resolve from cache
  if(unCached.length < 1) {
    return Promise.resolve(cached);
  }

  //get uncached label from DB
  return this.collection.find({ _id: { $in: unCached } }, config)
  .then(
    (labels) => {
      // cashe labels data in memory
      labels.forEach((label) => {
        Object.assign(cache.labels, { [label._id]: label })
      });

      // return cached and anuCached labels
      return cached.concat(labels);
    }
  );
}

LabelsService.prototype.close = function() {
  db.close();
}

module.exports = LabelsService;
