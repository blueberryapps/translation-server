/* @flow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Radium from 'radium';
import React, { PureComponent } from 'react';

import { colors } from '../globals';

type PropTypes = {
  disabled?: boolean,
  handleFocus?: Function,
  name?: string,
  onBlur: Function,
  onChange?: Function,
  onKeyDown?: Function,
  value: string
};

@Radium
export default class Checkbox extends PureComponent {
  static defaultProps = {
    disabled: false,
    onKeyDown: () => {},
    onChange: (...args) => {}, // eslint-disable-line no-unused-vars
    onBlur: (...args) => {}, // eslint-disable-line no-unused-vars
    name: '',
    handleFocus: () => {},
  }

  checkbox: HTMLInputElement;

  props: PropTypes

  toggleCheckbox = () => {
    const { onChange, handleFocus, value } = this.props;
    const newValue = value === 'true' ? 'false' : 'true';
    this.checkbox.focus();
    if (onChange)
      onChange(newValue);
    if (handleFocus)
      handleFocus();
  }

  render() {
    const { disabled, value, name, onBlur, onKeyDown } = this.props;
    const checked = value === 'true';

    return (
      <div style={styles.wrapper}>
        <input
          name={name}
          type="checkbox"
          value={value}
          ref={(el) => { this.checkbox = el; }}
          checked={value === 'true'}
          onChange={!disabled && this.toggleCheckbox}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          style={styles.input}
        />
        <div role="checkbox" aria-checked={checked} style={[styles.innerWrapper, disabled && styles.disabled]} onClick={!disabled && this.toggleCheckbox}>
          <div style={[styles.toggler.base, checked && styles.toggler.checked]}>
            <span style={[styles.circle.base, checked && styles.circle.checked]} />
          </div>
          <span style={[styles.text.base, checked && styles.text.checked]}>{value === 'true' ? 'ON' : 'OFF'}</span>
        </div>
      </div>
    );
  }
}

const styles = {
  wrapper: {
    display: 'flex',
    overflow: 'hidden',
    position: 'relative'
  },
  innerWrapper: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    userSelect: 'none'
  },
  input: {
    opacity: 0,
    right: 0,
    position: 'absolute'
  },
  disabled: {
    cursor: 'not-allowed'
  },
  toggler: {
    base: {
      position: 'relative',
      marginRight: '18px',
      height: '10px',
      width: '45px',
      borderRadius: '5px',
      backgroundColor: colors.inputBorder,
      transition: 'background-color .2s'
    },
    checked: {
      backgroundColor: colors.primary
    }
  },
  circle: {
    base: {
      width: '18px',
      height: '18px',
      display: 'block',
      backgroundColor: colors.primary,
      borderRadius: '50%',
      position: 'absolute',
      top: '50%',
      marginTop: '-9px',
      left: 0,
      transition: 'left .2s'
    },
    checked: {
      left: '28px'
    }
  },
  text: {
    base: {
      fontWeight: 900,
      fontSize: '16px',
      color: colors.inputBorder
    },
    checked: {
      color: colors.primary
    }
  }
};
