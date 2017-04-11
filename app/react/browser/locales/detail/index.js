import React, { PropTypes as RPT } from 'react';

export default class Project extends React.PureComponent {
  static propTypes = {
    params: RPT.shape({ id: RPT.string }).isRequired,
  };
  render() {
    return <div>Im locale number {this.props.params.id}</div>;
  }
}
