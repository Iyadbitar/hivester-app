const WorkspacesService = require('../../services/workspaces.service');
workspacesService = new WorkspacesService();

const ExportsService = require('../../services/exports.service');
exportsService = new ExportsService();

const config = require('../../../config/server.config');

const ExportController = function() {};

const { exec } = require('child_process');

var SAFE_SETS = {
  actions: true
}

var SAFE_TYPES = {
  csv: true
}

ExportController.prototype.start = function(req, res, next, wsInstance) {
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

  workspacesService.getById(workspaceId)
  .then( (workspace) => {
      if(false === !!workspace){
        res.status(402).send({error: 'No workspace found with ID provided'});
        res.end();
        return Promise.reject();
      }
      return workspace;
    })
  .then(
    (workspace) => {
      return exportsService.insert({
        type: exportType,
        createdAt: Date.now(),
        dataSet: exportSet,
        target: 'workspace',
        targetId: workspace._id,
        createdBy: 'userId',
        status: 'in-progress'
      })
      .then(
        (exportJob) => {
          return Promise.resolve({ workspace, exportJob })
        }
      )
    }
  )
  .then( (data) => this.startExporting(data.workspace, data.exportJob, wsInstance) )
  .then( (exportJob) => res.status(200).send({message: 'export-stated', exportJob }) )
  .catch(next);
}

ExportController.prototype.startExporting = function(workspace, exportJob, wsInstance) {
  const filePath = `${config.exportsSavingFolder}/export_${exportJob.dataSet}_${exportJob._id}.${exportJob.type}`;
  // at this point the workspace is is valid and a workspace exists in DB
  // so envoking below command as child process will be safe
  const command = `node exporter.js ${workspace._id} > ${filePath}`;
  const child = exec(command);

  child.stdout.on('data', (data) => {
    console.log(`child stdout:\n${data}`);
  });

  child.on('exit', function (code, signal) {
    if(code === 0) {
      wsInstance.getWss().clients.forEach (
        (client) => {
          client.send(JSON.stringify({event: 'export-end', exportJob: exportJob}) );
        }
      )
    }

    console.log('child process exited with ' +
                `code ${code} and signal ${signal}`);
  });
  return Promise.resolve(exportJob);
}

module.exports = ExportController;
