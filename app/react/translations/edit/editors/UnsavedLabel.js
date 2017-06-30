/* @flow */
import Radium from 'radium';
import React from 'react';

import { colors } from '../../../globals';

type PropTypes = {
  focused: boolean,
  saved: boolean,
};

const UnsavedLabel = ({ focused, saved }: PropTypes) => (
  <span style={[styles.base, !saved && !focused && styles.visible]}>
    Unsaved
  </span>
);

const styles = {
  base: {
    backgroundColor: colors.red,
    position: 'absolute',
    right: 0,
    bottom: 0,
    opacity: 0,
    fontSize: '13px',
    color: colors.white,
    padding: '5px',
    transition: 'opacity .2s ease .2s'
  },
  visible: {
    opacity: 1
  }
};

export default Radium(UnsavedLabel);
