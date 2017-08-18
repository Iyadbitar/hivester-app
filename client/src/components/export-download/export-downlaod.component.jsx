import React from 'react';

export default class ExportDownload extends React.Component {

  componentWillReceiveProps(nextProps) {
    if(true === nextProps.isDownload) {
      this.refs.downloadForm.submit();
    }
  }

  render() {
    return <form action={this.props.downloadUrl} method="GET" ref="downloadForm">
      <input type="hidden" name="exportJobId" value={this.props.exportJobId}/>
    </form>
  }
}
