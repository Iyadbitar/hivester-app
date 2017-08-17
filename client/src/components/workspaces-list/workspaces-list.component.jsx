import React from 'react';
import { WorkspacesListItem } from '../';

import styles from './workspaces-list.component.scss';

export default class WorkspacesList extends React.Component {

  getWorkspaceRows() {
    const { exportWorkspace } = this.props.actions;
    const actions = { exportWorkspace };
    return this.props.workspaces.map( (workspace, index) => {
      return <WorkspacesListItem workspace={workspace} actions={actions} key={index} isExporting={this.props.exporting[workspace._id]}/>
    })
  }

  render() {
    return this.props.workspaces.length > 0 ?
      <div className={styles['list']}>
        <p>You have {this.props.workspaces.length} Wrokspace{this.props.workspaces.length>1 ? 's' : ''} in your list</p>
        <table className={styles['table']}>
          <thead className={styles['table-th']}>
            <tr>
              <th>Workspace Name</th>
              <th>Export</th>
            </tr>
          </thead>
          <tbody>
            {this.getWorkspaceRows()}
          </tbody>
          <tfoot>
            <tr className={styles['footer']}>
              <td colSpan="2" className={styles['right']}></td>
            </tr>
          </tfoot>
        </table>
      </div> :
      <div className={styles['list']}>
        <p>No workspaces found!</p>
      </div>
  }
}
