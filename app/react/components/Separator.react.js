import React from 'react';
import { colors } from '../globals';

const Separator = () => (
  <div style={styles.separator} />
);

const styles = {
  separator: {
    width: '1px',
    height: '25px',
    backgroundColor: colors.inputBorder
  }
};

export default Separator;
