import React, { PropTypes as RPT } from 'react';

export default class App extends React.PureComponent {

  static propTypes = {
    children: RPT.node.isRequired
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        { children }
      </div>
    );
  }
}
