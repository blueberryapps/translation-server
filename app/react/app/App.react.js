/* @flow */
import React from 'react';

export default class App extends React.PureComponent {
  props: { children: Node }

  render() {
    const { children } = this.props;

    return (
      <div>
        {children}
      </div>
    );
  }
}
