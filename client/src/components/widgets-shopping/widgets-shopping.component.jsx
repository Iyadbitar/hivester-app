import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';

import { WidgetsList } from '../'

import styles from './widgets-shopping.component.css';

class WidgetsShopping extends React.Component {

  componentDidMount() {
    this.props.actions.loadWidgetList();
  }

  render() {
    return <div className={styles['widgets']}>
      <div className="row">
        <h1>Widgets Shopping</h1>
      </div>
      <div className="row">
        <WidgetsList
          widgets={this.props.widgets}
          editedWidgetId={this.props.editedWidgetId}
          actions={this.props.actions} />
      </div>
    </div>
  }
}

function mapStateToProps(state) {
  return {
    widgets: state.appState.widgetsList,
    editedWidgetId: state.uiState.editedWidgetId
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(WidgetsShopping)
