let instance = null;

import { endWorkspaceExport } from '../actions';

class NotificationsService {

  constructor(store) {
    this.store = store;

    this.webSocket = new WebSocket("ws://localhost:4200/notifications");
    this.webSocket.onmessage = this.eventListner;

    if(!instance){
      instance = this;
    }
    return instance;
  }

  eventListner = (evt) => {
    let { data } = evt;
    data = JSON.parse(data);

    if(data.event !== 'export-end'){
      return;
    }

    const { appState } = this.store.getState();
    if(appState.exportingWorkspaces[data.exportJob.targetId]){
      this.store.dispatch(endWorkspaceExport(data.exportJob));
    }
  }
}

export default NotificationsService;
