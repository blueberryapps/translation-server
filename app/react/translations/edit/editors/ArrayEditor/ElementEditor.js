/* @flow */
import React from 'react';

export type ArrayInfo = {
  index: number,
  length: number
}

type PropTypes = {
  value: string,
  index: number,
  length: number,
  // eslint-disable-next-line react/no-unused-prop-types
  onChange: Function,
  onKeyDown: Function,
};

export default class ElementEditor extends React.Component {
  constructor(props: PropTypes) {
    super(props);
    this.arrayInfo = {
      index: props.index,
      length: props.length,
    };
  }

  componentDidMount = () => this.input.focus();

  arrayInfo: ArrayInfo
  input: HTMLInputElement
  props: PropTypes

  handleChange = (event: Event) =>
    this.props.onChange(event, this.arrayInfo);
  handleKeyDown = (event: Event) =>
    this.props.onKeyDown(event, this.arrayInfo);


  render = () => (
    <input
      value={this.props.value}
      ref={(element: HTMLInputElement): void => { this.input = element; }}
      onChange={this.handleChange}
      onKeyDown={this.handleKeyDown}
    />
  );
}
