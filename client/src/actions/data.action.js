import HttpService from '../services/http.service';
const httpService = new HttpService();

export const LOAD_WORKSPACES = 'LOAD_WORKSPACES'
export const SET_WORKSPACES = 'SET_WORKSPACES';
export const START_WORKPSACE_EXPORT = 'START_WORKPSACE_EXPORT';
export const END_WORKPSACE_EXPORT = 'END_WORKPSACE_EXPORT';
export const EXPORTT_WORKSPACE = 'EXPORTT_WORKSPACE';
export const DELETE_WIDGET = 'DELETE_WIDGET';
export const EXPORT_DOWNLOAD = 'EXPORT_DOWNLOAD';


export function loadWorspacesAction() {

  return {
    type: LOAD_WORKSPACES,
    promiseFactory: (dispatch, getState) => {
      // this promise factory should return a function that return a promise
      const { backendBaseUrl, backendEndPoints } = getState().appConfig;
      return () => httpService.get(backendBaseUrl + backendEndPoints.workspace, {})
      .then( data => {
          dispatch(setWorkspacesList(data.workspaces))
        }
      )
    }
  }
}

export function setWorkspacesList(workspaces) {
  return {
    type: SET_WORKSPACES,
    workspaces: workspaces
  }
}

export function startWorkspaceExport(workspaceId) {
  return {
    type: START_WORKPSACE_EXPORT,
    workspaceId: workspaceId,
  }
}

export function exportWorkspace(workspaceId) {
  return {
    type: EXPORTT_WORKSPACE,
    promiseFactory: (dispatch, getState) => {
      dispatch(startWorkspaceExport(workspaceId));
      // this promise factory should return a function that return a promise
      const { backendBaseUrl, backendEndPoints } = getState().appConfig;
      return () => httpService.get(backendBaseUrl + backendEndPoints.export, {exportType:'csv', workspace:workspaceId})
      .then( data => {
          // console.log(data)
          // dispatch(setWorkspacesList(data.workspaces))
        }
      )
    }
  }
}

export function downloadExport(exportJobId) {
  return {
    type: EXPORTT_WORKSPACE,
    promiseFactory: (dispatch, getState) => {
      // this promise factory should return a function that return a promise
      const { backendBaseUrl, backendEndPoints } = getState().appConfig;
      return () => httpService.get(backendBaseUrl + backendEndPoints.download, {exportJobId})
      .then( data => {
          console.log(data)
          // dispatch(setWorkspacesList(data.workspaces))
        }
      )
    }
  }
}

export function endWorkspaceExport(exportJob) {
  return {
    type: END_WORKPSACE_EXPORT,
    exportJob: exportJob
  }
}

export function deleteWidget(widgetId) {
  return {
    type: DELETE_WIDGET,
    widgetId: widgetId
  }
}
