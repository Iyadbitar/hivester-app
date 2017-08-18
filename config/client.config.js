const path = require('path');

var config = {
  backendBaseUrl: 'http://localhost:4200/api',
  notificationsUrl: 'http://localhost:4200/notifications',
  backendEndPoints: {
    login: '/login',
    logout: '/logout',
    workspace: '/workspace',
    export: '/export/start/actions',
    download: '/export/download'
  }
};

module.exports = config;
