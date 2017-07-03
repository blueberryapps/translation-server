/* @flow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Radium from 'radium';
import React from 'react';

import { colors } from '../../../../../globals';

type PropTypes = {
  onToggle: Function,
  children: Node,
  active: boolean,
  label?: string,
  style: string
}

@Radium
export default class StyleButton extends React.Component {
  static defaultProps = {
    label: '',
  }

  constructor(props: PropTypes) {
    super(props);
    this.onToggle = (event: Event) => {
      event.preventDefault();
      props.onToggle(props.style);
    };
  }

  onToggle: Function
  props: PropTypes

  render() {
    const { active, label, children } = this.props;
    return (
      <span
        onMouseDown={this.onToggle}
        style={[styles.button, active && styles.active]}
      >
        {children || label}
      </span>
    );
  }
}

const styles = {
  button: {
    height: '35px',
    cursor: 'pointer',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '0px 12px',
    borderRight: `1px solid ${colors.inputBorder}`,
    transition: 'color .2s'
  },
  active: {
    color: colors.primary
  }
};
