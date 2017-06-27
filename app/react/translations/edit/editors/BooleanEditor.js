/* @flow */
import React, { PureComponent } from 'react';

import type { FieldInfo } from '../index';
import Checkbox from '../../../components/Checkbox.react';
import EditorWrapper from './EditorWrapper';
import EditorSave from './EditorSave';
import UnsavedLabel from './UnsavedLabel';

type PropTypes = {
  onChange: Function,
  onSubmit: Function,
  value: string,
  saved: boolean,
  focused: boolean,
  handleBlur: Function,
  handleFocus: Function,
  registerTabPress: Function,
  tabPressed: ?boolean,
  fieldInfo: FieldInfo
};

export default class BooleanEditor extends PureComponent {
  onCheckboxChange = (newValue) => {
    const { onChange, fieldInfo } = this.props;
    onChange(newValue, fieldInfo);
  }

  props: PropTypes

  handleBlur = () => {
    if (this.props.tabPressed) {
      this.handleSubmit();
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
        <EditorWrapper>
          <Checkbox
            name={fieldId}
            value={value}
            onChange={this.onCheckboxChange}
            handleFocus={this.handleFocus}
            onKeyDown={this.props.registerTabPress}
            onBlur={this.handleBlur}
          />
          <UnsavedLabel focused={focused} saved={saved} />
        </EditorWrapper>
        <EditorSave onClick={this.handleSubmit} saved={saved} focused={focused} />
      </div>
    );
  }
}
