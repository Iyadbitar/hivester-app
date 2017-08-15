const ExportController = function() {};

const { exec } = require('child_process');

var SAFE_SETS = {
  actions: true
}

var SAFE_TYPES = {
  csv: true
}

ExportController.prototype.start = function(req, res) {
  let exportSet, exportType, workspaceId;

  // protect against werid value in vars
  if(true === !!req.params.exportSet && req.params.exportSet in SAFE_SETS) {
    exportSet = req.params.exportSet;
  }
  else {
    res.status(500).send({error: 'Provide valid export set'});
    return;
  }

  if(true === !!req.query.exportType && req.query.exportType in SAFE_TYPES) {
    exportType = req.query.exportType;
  }
  else {
    res.status(500).send({error: 'Provide valid export type'});
    return;
  }

  if(true === !!req.query.workspace) {
    workspaceId = req.query.workspace;
  }
  else {
    res.status(500).send({error: 'Provide valid workspace ID'});
    return;
  }

  const command = `node exporter.js ${workspaceId} > data.csv`;
  const child = exec(command);

  child.stdout.on('data', (data) => {
    console.log(`child stdout:\n${data}`);
  });

  child.on('exit', function (code, signal) {
    console.log('child process exited with ' +
                `code ${code} and signal ${signal}`);
  });

  res.status(200).send({message: 'Exporting started'})
}

module.exports = ExportController;
