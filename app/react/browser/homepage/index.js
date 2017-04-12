import React from 'react';
import HeaderHome from '../app/HeaderHome.react';
import Projects from '../projects/list';

export default class Homepage extends React.PureComponent {
  render() {
    return (
      <div>
        <HeaderHome />
        Homepages
        <Projects />
      </div>
    );
  }
}
