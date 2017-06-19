/* @flow */
import React, { PureComponent } from 'react';
import { colors } from '../../../globals';

type PropTypes = {
  children: Node
};

export default class EditorWrapper extends PureComponent {
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
    fontSize: '16px',
    backgroundColor: colors.white
  }
};
