import { CONF_LOAD } from '../actions/types';

const appConfig = (state = {}, action) => {
  switch(action.type){
    case CONF_LOAD:
      return {...action.config };
  }
  return state;
}

export default appConfig;
