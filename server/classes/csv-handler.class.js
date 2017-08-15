var json2csv = require('json2csv');

class CsvHandler {
  constructor () { }

  arrayToCSV(data) {

    const fields = Object.keys(data[0]).sort();
    return json2csv( { data: data, fields: fields });
  }
}

module.exports = CsvHandler;
