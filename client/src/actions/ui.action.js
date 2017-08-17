export const SET_EDIT_WIDGET = 'SET_EDIT_WIDGET';
export const DATA_LOADING = 'DATA_LOADING';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const BACKEND_ERROR = 'BACKEND_ERROR';

export function setEditWidget(widgetId) {
  return {
    type: SET_EDIT_WIDGET,
    widgetId: widgetId
  }
}

export const dataLoading = (isDataLoading = false) => {
  return {
    type: DATA_LOADING,
    isDataLoading
  }
}

export const loginErrorAction = (isLoginError = false) => {
  return {
    type: LOGIN_ERROR,
    isLoginError
  }
}

export const backendErrorAction = (isBackendError = false) => {
  return {
    type: BACKEND_ERROR,
    isBackendError
  }
}
