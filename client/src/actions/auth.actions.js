export const USER_LOGIN = 'USER_LOGIN';
export const SET_USER = 'SET_USER';

import HttpService  from '../services/http.service';
const httpService = new HttpService();

import { loginErrorAction, dataLoading } from './ui.action';

export const userLoginAction = (creds) => {
  return {
    type: USER_LOGIN,
    promiseFactory: (dispatch, getState) => {
      const { backendBaseUrl, backendEndPoints } = getState().appConfig;
      // this promise factory should return a function that return a promise
      return () => httpService.post(backendBaseUrl + backendEndPoints.login, creds, {})
      .then(
        data => {
          if(false !== !!data.user) {
            dispatch(setLoggedInUserAction(data.user));
          }
          else {
            dispatch(loginErrorAction(true))
          }
      })
    }
  }
};

export const setLoggedInUserAction = (user) => {
  return {
    type: SET_USER,
    user: user
  }
}
