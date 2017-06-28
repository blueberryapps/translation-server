/* @flow */
import React from 'react';
import { colors } from '../../../globals';

const EditorWrapper = ({ children }: { children: Node }) => (
  <div style={styles.wrapper}>
    {children}
  </div>
);

const styles = {
  wrapper: {
    padding: '25px',
    position: 'relative',
    fontSize: '16px',
    backgroundColor: colors.white
  }
};

export default EditorWrapper;
