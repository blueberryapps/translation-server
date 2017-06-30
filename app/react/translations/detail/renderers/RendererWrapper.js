/* @flow */
import React from 'react';

import { colors } from '../../../globals';

type PropTypes = {
  children: Node
}

const RendererWrapper = ({ children }: PropTypes) => (
  <div style={styles.wrapper}>
    {children}
  </div>
);

export default RendererWrapper;

const styles = {
  wrapper: {
    padding: '25px',
    display: 'flex',
    alignItems: 'center',
    borderBottom: `1px solid ${colors.inputBorder}`
  }
};
