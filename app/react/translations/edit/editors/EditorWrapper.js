/* @flow */
import React, { Component } from 'react';
import { colors } from '../../../globals';

type PropTypes = {
  children: Node
};

export default class EditorWrapper extends Component {
  props: PropTypes;

  render() {
    const { children } = this.props;
    return (
      <div style={styles.wrapper}>
        {children}
      </div>
    );
  }
}

const styles = {
  wrapper: {
    padding: '25px',
    backgroundColor: colors.white
  }
};
