/* @flow */
import Radium from 'radium';
import React from 'react';
import { colors } from '../../../../globals';

export type ArrayInfo = {
  index: number,
  length: number
}

type PropTypes = {
  handleBlur: Function,
  handleChangeSelectedInput: Function,
  handleFocus: Function,
  index: number,
  length: number,
  onChange: Function,
  onKeyDown: Function,
  selectedInput: number,
  shouldFocus: boolean,
  value: string,
};

@Radium
export default class ElementEditor extends React.Component {
  constructor(props: PropTypes) {
    super(props);
    this.arrayInfo = {
      index: props.index,
      length: props.length,
    };
  }

  componentDidMount = () => this.props.shouldFocus && this.input.focus();

  arrayInfo: ArrayInfo
  input: HTMLInputElement
  props: PropTypes

  handleChange = (event: Event) =>
    this.props.onChange(event, this.arrayInfo);

  handleKeyDown = (event: Event) =>
    this.props.onKeyDown(event, this.arrayInfo);

  handleOnFocusIn = () => {
    this.props.handleFocus();
    this.props.handleChangeSelectedInput(this.props.index);
  }

  handleOnBlur = () => {
    this.props.handleBlur();
    this.props.handleChangeSelectedInput(null);
  }

  render() {
    const { index, selectedInput } = this.props;
    const selected = selectedInput === index;
    return (
      <div style={styles.wrapper}>
        <span style={[styles.circle, selected && styles.selected]}>{index + 1}</span>
        <input
          value={this.props.value}
          ref={(element: HTMLInputElement): void => { this.input = element; }}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          onFocus={this.handleOnFocusIn}
          onBlur={this.handleOnBlur}
          style={styles.input}
        />
      </div>
    );
  }
}

const styles = {
  wrapper: {
    display: 'flex',
    position: 'relative'
  },
  input: {
    flex: '1 1 auto',
    padding: '5px 5px 5px 30px',
    border: 'none',
    opacity: .6,
    transition: 'opacity .2s',
    zIndex: 1,
    ':focus': {
      outline: 'none',
      opacity: 1
    }
  },
  circle: {
    display: 'flex',
    flex: '0 0 auto',
    pointerEvents: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: '50%',
    marginTop: '-12px',
    width: '25px',
    height: '25px',
    borderRadius: '50%',
    marginRight: '5px',
    fontWeight: 900,
    color: colors.white,
    backgroundColor: colors.inputBorder,
    transition: 'background-color .2s',
    zIndex: 2
  },
  selected: {
    backgroundColor: colors.primary
  }
};
