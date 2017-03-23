import React, { PropTypes } from 'react';

export default class ApplicationLayout extends React.PureComponent {

  static propTypes = {
    children: PropTypes.node.isRequired
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        <div style={{ overflowX: 'hidden' }}>
          {children}
        </div>
      </div>
    );
  }
}
