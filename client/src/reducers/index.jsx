import { combineReducers } from 'redux';

import uiState from './ui-state.reducer';
import appState from './app-state.reducer';
import appConfig from './config.reducer';

const reducers = combineReducers({
  uiState,
  appState,
  appConfig
});

export default reducers;
