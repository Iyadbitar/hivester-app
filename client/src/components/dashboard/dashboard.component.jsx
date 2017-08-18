import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';
import { Route, Redirect } from 'react-router'

import styles from './dashboard.component.scss';

import { WorkspacesList } from '../';

class Dashboard extends React.Component {

  componentDidMount() {
    this.props.actions.loadWorspacesAction();
  }

  render() {
    if(!this.props.user) {
      return <Redirect to={{pathname: '/'}} />
    }
    return <div className={styles['dashboard']}>
      <h1 className={styles['h1']}>Hivester Dashboard</h1>

      <WorkspacesList
        workspaces={this.props.workspaces}
        actions={this.props.actions}
        exporting={this.props.exporting}
        ready={this.props.ready}
        config={this.props.config}/>
    </div>
  }
}

function mapStateToProps(state) {
  return {
    user: state.appState.user,
    isLoginError: state.uiState.isLoginError,
    isDataLoading: state.uiState.isDataLoading,
    workspaces: state.appState.workspaces,
    exporting: state.appState.exportingWorkspaces,
    ready: state.appState.readyExportJobs,
    config: state.appConfig
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
