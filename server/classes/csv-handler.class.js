var json2csv = require('json2csv');
var _ = require('lodash');

class CsvHandler {
  constructor () { }

  arrayToCSV(data) {
    // make sure all fields included in case there some action missing some fields
    const allFields = data.reduce( (acc, item) => {
      return _.union(acc, Object.keys(item));
    }, [])
    .sort();
    return json2csv( { data: data, fields: allFields });
  }
}

module.exports = CsvHandler;
