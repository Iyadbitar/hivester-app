import { DATA_LOADING, SET_EDIT_WIDGET, LOGIN_ERROR } from '../actions/types';

const uiState = (state = {}, action) => {
  switch(action.type){
    case DATA_LOADING:
      return { ...state, isDataLoading: action.isDataLoading }
    case SET_EDIT_WIDGET:
      return { ...state, editedWidgetId: action.widgetId }
    case LOGIN_ERROR:
      return { ...state, isLoginError: action.isLoginError }
    default:
      return {...state};
  }
}

export default uiState;
