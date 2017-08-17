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
      const data = Object.assign({}, state.exportingWorkspaces);
      exportingWorkspaces = Object.keys(data).reduce(
        (acc, key) => {
          if(key !== action.workspacesId) {
            acc = Object.assign(acc, data[key]);
          }
          return acc;
        }, {}
      )
      console.log('>>>', exportingWorkspaces)
      return { ...state, exportingWorkspaces };
    case USER_LOGIN:
        return { ...state }
    case SET_USER:
        return { ...state, user: action.user}
    default:
      return { ...state} ;
  }
}

export default appState;
