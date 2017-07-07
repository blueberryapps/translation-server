// @flow
import React from 'react';
import HeaderHome from '../app/HeaderHome.react';
import Layout from '../layouts/ApplicationLayout.react';
import Projects from '../projects/list';

export default class Homepage extends React.PureComponent {
  render() {
    return (
      <Layout>
        <HeaderHome />
        <Projects />
      </Layout>
    );
  }
}
