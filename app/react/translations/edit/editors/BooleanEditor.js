/* @flow */
import React, { PureComponent } from 'react';

import type { FieldInfo } from '../index';
import Checkbox from '../../../components/Checkbox.react';
import EditorWrapper from './EditorWrapper';
import EditorSave from './EditorSave';

type PropTypes = {
  onChange: Function,
  onSubmit: Function,
  value: string,
  saved: boolean,
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
  }

  handleSubmit = (e: Event) => {
    if (e) e.preventDefault();
    this.props.onSubmit(this.props.value, this.props.fieldInfo);
  }

  render() {
    const { value, saved, fieldInfo: { fieldId } } = this.props;

    return (
      <div>
        <EditorWrapper>
          <Checkbox
            name={fieldId}
            value={value}
            onChange={this.onCheckboxChange}
            onKeyDown={this.props.registerTabPress}
            onBlur={this.handleBlur}
          />
        </EditorWrapper>
        <EditorSave onClick={this.handleSubmit} saved={saved} />
      </div>
    );
  }
}
