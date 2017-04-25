/* @flow */
import React from 'react';
import Layout from '../layouts/ApplicationLayout.react';

export default class App extends React.PureComponent {
  props: { children: Node }

  render() {
    const { children } = this.props;

    return (
      <Layout>
        {children}
      </Layout>
    );
  }
}
