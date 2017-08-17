import React from 'react';

import styles from './workspaces-list-item.component.scss';

export default class WorkspacesListItem extends React.Component {

  exportWorkspace = () => {
    this.props.actions.exportWorkspace(this.props.workspace._id);
  }

  render() {
    let button;
    if(this.props.isExporting){
      button = <button className={styles['button-disabled']} disabled={true}>Exporting...</button>;
    }
    else {
      button = <button className={styles['button']} onClick={this.exportWorkspace}>Export</button>
    }
    return <tr className={styles['item']}>
      <td>{this.props.workspace.name}</td>
      <td className={styles['center']}>{button}</td>
    </tr>
  }
}
