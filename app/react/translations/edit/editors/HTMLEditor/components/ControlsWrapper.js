/* @flow */
import React from 'react';
import { colors } from '../../../../../globals';

const ControlsWrapper = ({ children }: { children: Node }) => (
  <div style={styles.wrapper}>
    {children}
  </div>
);

const styles = {
  wrapper: {
    display: 'flex',
    borderBottom: `1px solid ${colors.inputBorder}`,
    borderLeft: `1px solid ${colors.inputBorder}`,
    borderTop: `1px solid ${colors.inputBorder}`,
  }
};

export default ControlsWrapper;
