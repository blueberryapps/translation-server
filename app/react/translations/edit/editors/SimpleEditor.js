/* @flow */
import React, { Component } from 'react';

import type { FieldInfo } from '../index';
import EditorWrapper from './EditorWrapper';

const typeRegistry = {
  string: 'text',
  symbol: 'text',
  integer: 'number',
  float: 'number',
};

type PropTypes = {
  onChange: Function,
  onSubmit: Function,
  registerPressKey: Function,
  dataType: string,
  fieldInfo: FieldInfo,
  pressedKeyCode: ?number,
  value: string,
};

export default class SimpleEditor extends Component {
  input: HTMLInputElement
  props: PropTypes

  handleChange = (e: Event) => {
    e.preventDefault();
    if (this.input) {
      this.props.onChange(this.input.value, this.props.fieldInfo);
    }
  }

  /* This needs to be done, because, onKey events are triggerd AFTER tab switches to another input */
  handleBlur = () =>
    (this.props.pressedKeyCode === 9) && this.handleSubmit();


  handleSubmit = () => {
    const { fieldInfo, value } = this.props;
    this.props.onSubmit(value, fieldInfo);
  }

  render() {
    const { value, dataType } = this.props;

    return (
      <EditorWrapper>
        <form>
          <input
            type={typeRegistry[dataType]}
            value={value}
            onKeyDown={this.props.registerPressKey}
            ref={(el) => { this.input = el; }}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
        </form>
      </EditorWrapper>
    );
  }
}
