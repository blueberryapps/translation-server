/* @flow */
import React from 'react';
import { colors } from '../../../../../globals';

type PropTypes = {
  children: Node
}

export default class ControlsWrapper extends React.Component {
  props: PropTypes

  render() {
    return (
      <div style={styles.wrapper}>
        {this.props.children}
      </div>
    );
  }
}

const styles = {
  wrapper: {
    display: 'flex',
    borderBottom: `1px solid ${colors.inputBorder}`,
    borderLeft: `1px solid ${colors.inputBorder}`,
    borderTop: `1px solid ${colors.inputBorder}`,
  }
};
