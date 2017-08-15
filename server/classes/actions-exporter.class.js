const _ = require('lodash');
const ActionsService = require('../services/actions.service');
const actions = new ActionsService();

const WorkspacesService = require('../services/workspaces.service');
const workspacesService = new WorkspacesService();

const UsersService = require('../services/users.service');
const usersService = new UsersService();

const LabelsService = require('../services/labels.service');
const labelsService = new LabelsService();

const ProjectsService = require('../services/projects.service');
const projectsService = new ProjectsService();

const CsvHandler = require('./csv-handler.class');
const csvHanlder = new CsvHandler();

function ActionsExporter() { }

ActionsExporter.prototype.cache = {};

ActionsExporter.prototype.exportWorkspace = function(workspaceId, callback) {

  // get workspace object first and save it in cache
  workspacesService.getById(workspaceId, { fields: { name: 1 } })
  .then(
    workspace => {
      this.cache['workspace'] = workspace;
      // get all porect in this workspace and save them in cache
      return projectsService.getByWorkspace(workspace._id);
    }
  )
  .then(
    (projects) => {
      this.cache['projects'] = _.keyBy(projects, '_id');
      // get all actions ids in workspace
      return actions.getByWorkspace(workspaceId, 'id');
    }
  )
  .then(
    (data) => {
      const allPromises = data.map(
        (actionId) => {
          return this.getDenormalizedAction(actionId._id);
        }
      );
      return Promise.all(allPromises);
    }
  )
  .then( (denormalizedActions) => this.addSequanceId(denormalizedActions) )
  .then( (actions) => this.handleData(actions) )
  .then( (actions) => callback(actions) )
  .then( () => actions.close() )
  .catch(() => this.errorHandler);

  return this;
}

ActionsExporter.prototype.toCSV = function() {
  this.exportType = 'csv';
  return this;
}

ActionsExporter.prototype.getDenormalizedAction = function(actionId) {
  return actions.getById(actionId)
  .then( (action) => this.denormalizeWorkspace(action) )
  .then( (action) => this.denormalizeUsers(action) )
  .then( (action) => this.denormalizeLabels(action) )
  .then( (action) => this.denormalizeProject(action) )
  .then( (action) => this.denormalizeAttachments(action) )
  .then( (action) => this.cleanAction(action) )
  // .then(console.log)
}

ActionsExporter.prototype.denormalizeWorkspace = function(action) {
  action.workspace = this.cache['workspace'].name;
  return Promise.resolve(action)
}

ActionsExporter.prototype.denormalizeUsers = function(action) {
  // build array of all needed user for this action
  let allNeededUsers =  _.union(
    action.assignees,
    action.readBy,
    [ action.createdBy, action.modifiedBy, action.assignedBy, action.completedBy ]
  );


  return usersService.getByIds(allNeededUsers)
  .then(
    (users) => {
      users = _.keyBy(users, '_id');

      // replace userId with user full name
      action.assignees = action.assignees.map(userId => usersService.getFullName(users[userId])).join('|');
      action.readBy = action.readBy.map(userId => usersService.getFullName(users[userId])).join('|');
      action.createdBy = usersService.getFullName(users[action.createdBy]);
      action.modifiedBy = usersService.getFullName(users[action.modifiedBy]);
      action.assignedBy = usersService.getFullName(users[action.assignedBy]);
      action.completedBy = usersService.getFullName(users[action.completedBy]);
      return action;
    }
  )
}

ActionsExporter.prototype.denormalizeLabels = function(action) {
  if(action.labels.length === 1 && action.labels[0] === 'none') {
    action.labels = 'none';
    return Promise.resolve(action);
  }

  return labelsService.getByIds(action.labels)
  .then(
    (labels) => {

      labels = _.keyBy(labels, '_id');
      action.labels = action.labels.map(
        id => {

          return labels[id] && labels[id].name
          ? `${labels[id].name}`
          : 'none';
        }).join(' | ');
      return action;
    }
  )
}

ActionsExporter.prototype.denormalizeProject = function(action) {
  action.project = action.projectId
  ? this.cache['projects'][action.projectId].name
  : 'null';

  return Promise.resolve(action);
}

ActionsExporter.prototype.denormalizeAttachments = function(action) {
  action.attachments = action.attachments.join('|');
  return Promise.resolve(action);
}

ActionsExporter.prototype.cleanAction = function(action) {
  return Promise.resolve( _.omit(action, ['ancestorAttributes', 'customFields']) );
}

ActionsExporter.prototype.handleData = function(actions) {
  // select the right data handler
  const data = {
    [true]: actions,
    [!this.exportType]: actions,
    [this.exportType === 'csv'] : csvHanlder.arrayToCSV(actions)
  }[true];
  return Promise.resolve(data);
}

ActionsExporter.prototype.addSequanceId = function(actions) {
  actions = actions.map( (action, index) => {
    action.id = index;
    return action
  });
  return Promise.resolve(actions);
}

ActionsExporter.prototype.errorHandler = function(error) {
  console.error(error);
  actions.close();
}

module.exports = ActionsExporter;
