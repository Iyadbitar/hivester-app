const path = require('path');

var config = {
  origin: 'localhost',
  originPort: 4200,
  key: '5dbb9671-5b83-4fe1-a239-04170a279ec0',
  livereload: {},
  exportsSavingFolder: path.resolve(__dirname, '../exports'),
  cookies: {
    userId: 'userId'
  }
};

module.exports = config;
