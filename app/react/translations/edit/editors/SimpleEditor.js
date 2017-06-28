/* @flow */
import Radium from 'radium';
import React, { PureComponent } from 'react';

import EditorSave from './EditorSave';
import EditorWrapper from './EditorWrapper';
import UnsavedLabel from './UnsavedLabel';

import type { FieldInfo } from '../index';

const typeRegistry = {
  string: 'text',
  symbol: 'text',
  integer: 'number',
  float: 'number',
};

type PropTypes = {
  dataType: string,
  fieldInfo: FieldInfo,
  focused: boolean,
  handleBlur: Function,
  handleFocus: Function,
  onChange: Function,
  onSubmit: Function,
  newTranslation: boolean,
  registerTabPress: Function,
  saved: boolean,
  tabPressed: ?boolean,
  value: string
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
  handleBlur = () => {
    if (this.props.tabPressed) this.handleSubmit();
    this.props.handleBlur();
  }

  handleFocus = () => this.props.handleFocus();

  handleSubmit = () => {
    const { fieldInfo, value } = this.props;
    this.props.onSubmit(value, fieldInfo);
  }

  render() {
    const { focused, value, dataType, saved, newTranslation } = this.props;
    const placeholderDisplayed = !value || newTranslation;

    return (
      <div>
        <EditorWrapper>
          <input
            type={typeRegistry[dataType]}
            value={value}
            onKeyDown={this.props.registerTabPress}
            ref={(el) => { this.input = el; }}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            style={[styles.input, focused && styles.focused]}
            placeholder={placeholderDisplayed && 'Translate into Czech here'}
          />
          <UnsavedLabel focused={focused} saved={saved} />
        </EditorWrapper>
        <EditorSave onClick={this.handleSubmit} saved={saved} focused={focused} />
      </div>
    );
  }
}

const styles = {
  input: {
    padding: '5px 0',
    width: '100%',
    border: 'none',
    opacity: .6,
    transition: 'opacity .2s',
    ':focus': {
      outline: 'none',
      opacity: 1
    }
  }
};
