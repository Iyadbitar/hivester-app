const WorkspaceService = require('../../services/workspaces.service');
const workspaceService = new WorkspaceService();

const config = require('../../../config/server.config');

const WorkspaceController = function() {};
WorkspaceController.prototype.start = function(req, res, next, wsInstance) {
  workspaceService.get()
  .then(
    (workspaces) => {
      if(workspaces){
        res.status(200).send({workspaces: workspaces});
      }
      else{
        res.status(400).send({error: 'no workspaces found'});
      }
    }
  )
  .catch(next)
}

module.exports = WorkspaceController;
