/* @flow */
import Radium from 'radium';
import React, { PureComponent } from 'react';
import EditorSave from './EditorSave';
import EditorWrapper from './EditorWrapper';

import type { FieldInfo } from '../index';

const typeRegistry = {
  string: 'text',
  symbol: 'text',
  integer: 'number',
  float: 'number',
};

type PropTypes = {
  onChange: Function,
  onSubmit: Function,
  registerTabPress: Function,
  dataType: string,
  fieldInfo: FieldInfo,
  tabPressed: ?boolean,
  saved: boolean,
  value: string,
};

@Radium
export default class SimpleEditor extends PureComponent {
  input: HTMLInputElement
  props: PropTypes

  handleChange = (e: Event) => {
    e.preventDefault();
    if (this.input) {
      this.props.onChange(this.input.value, this.props.fieldInfo);
    }
  }

  /* This needs to be done, because, onKey events are triggerd AFTER tab switches to another input */
  handleBlur = () => this.props.tabPressed && this.handleSubmit();

  handleSubmit = () => {
    const { fieldInfo, value } = this.props;
    this.props.onSubmit(value, fieldInfo);
  }

  render() {
    const { value, dataType, saved } = this.props;

    return (
      <div>
        <EditorWrapper>
          <input
            type={typeRegistry[dataType]}
            value={value}
            onKeyDown={this.props.registerTabPress}
            ref={(el) => { this.input = el; }}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            style={styles.input}
          />
        </EditorWrapper>
        <EditorSave onClick={this.handleSubmit} saved={saved} />
      </div>
    );
  }
}

const styles = {
  input: {
    padding: '5px 0',
    width: '100%',
    border: 'none',
    ':focus': {
      outline: 'none'
    }
  }
};
