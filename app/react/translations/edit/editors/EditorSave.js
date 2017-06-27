/* @flow */
import React, { PureComponent } from 'react';
import Radium from 'radium';
import Icon from '../../../components/Icon.react';
import { colors } from '../../../globals';

type PropTypes = {
  onClick: Function,
  focused: boolean,
  saved: boolean
};

@Radium
export default class EditorSave extends PureComponent {
  props: PropTypes


  render() {
    const { focused, onClick, saved } = this.props;

    return (
      <div style={[styles.base, focused && !saved && styles.editted]}>
        <div style={styles.innerWrapper}>
          <span>Press <strong>TAB</strong> to <strong>save</strong> and continue</span>
          <button onClick={onClick} style={styles.button}>
            <Icon color={colors.primary} kind="save" size={16} style={styles.icon} />
            Save
          </button>
        </div>
      </div>
    );
  }
}

const styles = {
  base: {
    height: 0,
    backgroundColor: colors.white,
    overflow: 'hidden',
    padding: '0px 25px',
    transition: 'height .2s ease .1s'
  },
  innerWrapper: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTop: `1px solid ${colors.inputBorder}`
  },
  editted: {
    height: '80px'
  },
  button: {
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    background: 'none',
    border: 'none',
    fontWeight: 900,
    textTransform: 'uppercase',
    color: colors.primary,
    ':focus': {
      outline: 'none'
    }
  },
  icon: {
    marginRight: '9px'
  }
};
