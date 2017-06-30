/* @flow */
import Radium from 'radium';
import React, { PureComponent } from 'react';

import Checkbox from '../../../components/Checkbox.react';
import EditorSave from './EditorSave';
import EditorWrapper from './EditorWrapper';
import UnsavedLabel from './UnsavedLabel';

import type { FieldInfo } from '../index';

type PropTypes = {
  focused: boolean,
  fieldInfo: FieldInfo,
  handleBlur: Function,
  handleFocus: Function,
  onChange: Function,
  onSubmit: Function,
  registerTabPress: Function,
  saved: boolean,
  tabPressed: ?boolean,
  value: string,
};

@Radium
export default class BooleanEditor extends PureComponent {
  onCheckboxChange = (newValue: string) => {
    const { onChange, fieldInfo } = this.props;
    onChange(newValue, fieldInfo);
  }

  props: PropTypes

  handleBlur = (e: Event) => {
    if (this.props.tabPressed) {
      this.handleSubmit(e);
      this.props.registerTabPress({ keyCode: null });
    }
    this.props.handleBlur();
  }

  handleFocus = () => this.props.handleFocus()

  handleSubmit = (e: Event) => {
    if (e) e.preventDefault();
    this.props.onSubmit(this.props.value, this.props.fieldInfo);
  }

  render() {
    const { focused, value, saved, fieldInfo: { fieldId } } = this.props;

    return (
      <div>
        <EditorWrapper focused={focused}>
          <div style={[styles.wrapper, focused && styles.focused]}>
            <Checkbox
              handleFocus={this.handleFocus}
              name={`${fieldId}`}
              onChange={this.onCheckboxChange}
              onBlur={this.handleBlur}
              onKeyDown={this.props.registerTabPress}
              value={value}
            />
          </div>
          <UnsavedLabel focused={focused} saved={saved} />
        </EditorWrapper>
        <EditorSave onClick={this.handleSubmit} saved={saved} focused={focused} />
      </div>
    );
  }
}

const styles = {
  wrapper: {
    opacity: .6,
    transition: 'opacity .2s'
  },
  focused: {
    opacity: 1
  }
};
