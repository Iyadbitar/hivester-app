import React from 'react';

import { ExportDownload } from '../';

import styles from './workspaces-list-item.component.scss';

export default class WorkspacesListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isDownload: false
    }
  }

  exportWorkspace = () => {
    // this.setState({isDownload: false});
    this.props.actions.exportWorkspace(this.props.workspace._id);
  }

  download = () => {
    this.setState({isDownload: true});
    setTimeout(()=>{
      this.setState({isDownload: false})
    }, 100)
  }

  render() {
    const { backendBaseUrl, backendEndPoints } = this.props.config;
    const downloadUrl = backendBaseUrl + backendEndPoints.download;

    let button;
    if(this.props.isExporting){
      button = <button className={styles['button-disabled']} disabled={true}>Exporting...</button>;
    }
    else {
      button = <div>
        <button className={styles['button']} onClick={this.exportWorkspace}>Export</button>
      </div>
    }

    let download;
    if(null !== this.props.exportJob && !this.props.isExporting) {
      download = <span>
        <span className={styles['download']}><a href="javascript:void(0);" onClick={this.download}>Download</a></span>
        <ExportDownload
          downloadUrl={downloadUrl}
          exportJobId={this.props.exportJob ? this.props.exportJob._id : ''}
          isDownload={this.state.isDownload}/>
      </span>
    }
    else {
      download = <span></span>
    }

    return <tr className={styles['item']}>
      <td>
        {this.props.workspace.name} {download}
      </td>
      <td className={styles['export']}>{button}</td>
    </tr>
  }
}
