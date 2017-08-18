import {
  LOAD_WORKSPACES,
  SET_WORKSPACES,
  START_WORKPSACE_EXPORT,
  END_WORKPSACE_EXPORT,
  DELETE_WIDGET,
  USER_LOGIN,
  SET_USER
} from '../actions/types';

const appState = (state = {}, action) => {

  switch(action.type){
    case LOAD_WORKSPACES:
      return { ...state };
    case SET_WORKSPACES:
      let { workspaces } = action;
      return {...state, workspaces};
    case START_WORKPSACE_EXPORT:
      let exportingWorkspaces = Object.assign({}, state.exportingWorkspaces);
      exportingWorkspaces[action.workspaceId] = true;
      return { ...state, exportingWorkspaces };
    case END_WORKPSACE_EXPORT:
      const exporting = Object.assign({}, state.exportingWorkspaces);
      const readyExportJobs = Object.assign({}, state.readyExportJobs);
      exportingWorkspaces = Object.keys(exporting).reduce(
        (acc, key) => {
          if(key !== action.exportJob.targetId) {
            acc = Object.assign(acc, data[key]);
          }
          return acc;
        }, {}
      )
      readyExportJobs[action.exportJob.targetId] = action.exportJob;
      return { ...state, exportingWorkspaces, readyExportJobs };
    case USER_LOGIN:
        return { ...state }
    case SET_USER:
        return { ...state, user: action.user}
    default:
      return { ...state} ;
  }
}

export default appState;
