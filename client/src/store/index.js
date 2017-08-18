import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import  { dataLoading }  from '../actions';

const sideEffect = store => next => action => {
  const hasSideEffect = action && 'function' === typeof action.promiseFactory;
  // if there is no promise to fullfill
  if(!hasSideEffect){
    return next(action);
  }

  const sideEffectPromise = action.promiseFactory(store.dispatch, store.getState);
  if(hasSideEffect){
    // notify state about data loading
    store.dispatch(dataLoading(true));

    // execute promise and notify state about data loading is done on reslove
    sideEffectPromise()
    .then(response => store.dispatch(dataLoading(false)))
    .catch(console.log)
  }

  return next(action);
}

const actionLogger = store => next => action => {
  console.log('action: ', action)
  console.log('state: ', store.getState());
  return next(action);
}

const INITIAL_STATE = {
  uiState: {
    isDataLoading: false,
    isLoginError: false,
    isBackendError: false,
    editedWidgetId: null
  },
  appState: {
    user: null,
    workspaces: null,
    exportingWorkspaces: {},
    readyExportJobs: {}
  },
  appConfig: { }
}

const store = createStore(reducers, INITIAL_STATE, applyMiddleware(actionLogger, sideEffect));

export default store;
