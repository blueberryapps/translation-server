import React, { PropTypes as RPT } from 'react';
import Layout from '../layouts/ApplicationLayout.react';

export default class App extends React.PureComponent {
  static propTypes = {
    children: RPT.node.isRequired,
  };

  render() {
    const { children } = this.props;

    return (
      <Layout>
        {children}
      </Layout>
    );
  }
}
