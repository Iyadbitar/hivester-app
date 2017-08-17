const DbConfig = require('../../config/db');
const monk = require('monk');

const url = `${DbConfig.server}:${DbConfig.port}/${DbConfig.database}`;

let instance;

class DatabaseService {
  constructor() {
    if(false === !!instance) {
      instance = monk(url, (error) => {
        if(error) {
          console.error('Error in connecting to MonogoDB');
          process.exit(1);
        }
      });
    }
    return instance;
  }
}

module.exports = DatabaseService;
