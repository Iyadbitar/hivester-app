import React from 'react';
import { WorkspacesListItem } from '../';

import styles from './workspaces-list.component.scss';

export default class WorkspacesList extends React.Component {

  getWorkspaceRows() {
    const { exportWorkspace, downloadExport } = this.props.actions;
    const actions = { exportWorkspace, downloadExport};
    return this.props.workspaces.map( (workspace, index) => {
      return <WorkspacesListItem
        workspace={workspace}
        actions={actions}
        key={index}
        exportJob={this.props.ready[workspace._id]||null}
        isExporting={this.props.exporting[workspace._id]}
        config={this.props.config}/>
    })
  }

  render() {
    return this.props.workspaces.length > 0 ?
      <div className={styles['list']}>
        <p className={styles['p']}>{this.props.workspaces.length} Wrokspace{this.props.workspaces.length>1 ? 's' : ''} available for export.</p>
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
