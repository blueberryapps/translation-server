import React from 'react';
import Layout from '../layouts/ApplicationLayout.react';
import HeaderHome from '../app/HeaderHome.react';

export default class Homepage extends React.PureComponent {

  render() {
    return (
      <Layout>
        <HeaderHome />
        Homepage
      </Layout>
    );
  }
}
