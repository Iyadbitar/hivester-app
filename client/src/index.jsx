import React from 'react';
import { render } from 'react-dom';

import styles from './css/defaults.scss';
import { Provider } from 'react-redux';
import store from './store';

import NotificationsService from './services/notifications.service';

const ns = new NotificationsService(store);

import config from '../../config/client.config';

import { HivesterApp } from './components';

import configAction from './actions/config.action';

class App extends React.Component {
  componentWillMount(){
    // reduce config object into store to be part of app state for easier access
    store.dispatch(configAction(config));
  }

  render() {
    return <Provider store={store}>
      <HivesterApp />
    </Provider>
  }
}

render(<App />, document.getElementById('app-wrapper'));
