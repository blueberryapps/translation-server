import Radium from 'radium';
import React from 'react';
import { colors, media } from '../globals';

const PercateBar = ({ number }: { number: Number }) => (
  <div style={styles.wrapper}>
    <div style={styles.number}>{number} %</div>
    <div style={styles.barWrapper}>
      <div style={[styles.bar, { width: `${number}%` }]} />
    </div>
  </div>
);

export default Radium(PercateBar);

const styles = {
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.primary,
    margin: '0 auto'
  },
  number: {
    fontWeight: 900,
    width: '100%',
    fontSize: '13px',
    [media.ml]: {
      textAlign: 'left',
      width: '43px',
    }
  },
  barWrapper: {
    width: '71px',
    display: 'block',
    height: '4px',
    position: 'relative',
    backgroundColor: colors.inputBorder,
  },
  bar: {
    backgroundColor: colors.primary,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0
  },
};
