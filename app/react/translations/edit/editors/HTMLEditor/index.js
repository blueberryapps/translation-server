/* @flow */
import React from 'react';

import EditorSave from '../EditorSave';
import EditorWrapper from '../EditorWrapper';
import RawEditor from './RawEditor';
import RichEditor from './RichEditor';
import UnsavedLabel from '../UnsavedLabel';

import type { FieldInfo } from '../../index';

type PropTypes = {
  fieldInfo: FieldInfo,
  focused: boolean,
  handleBlur: Function,
  handleFocus: Function,
  onChange: Function,
  onSubmit: Function,
  tabPressed: ?boolean,
  registerTabPress: Function,
  saved: boolean,
  value: string
}

type StateTypes = {
  editAsRaw: boolean
}

export default class HTMLEditor extends React.Component {
  constructor(props: PropTypes) {
    super(props);
    this.state = { editAsRaw: false };
  }

  state: StateTypes
  props: PropTypes

  handleSubmit = (e: Event) => {
    if (e) e.preventDefault();
    this.props.onSubmit(this.props.value, this.props.fieldInfo);
  }

  toggleRawEdit = () =>
    this.setState({ editAsRaw: !this.state.editAsRaw })

  render() {
    const { editAsRaw } = this.state;
    const { focused, handleBlur, handleFocus, onChange, saved, registerTabPress, tabPressed } = this.props;

    return (
      <div>
        <EditorWrapper>
          {this.state.editAsRaw
            ? <RawEditor
              editAsRaw={editAsRaw}
              handleBlur={handleBlur}
              handleFocus={handleFocus}
              handleSubmit={this.handleSubmit}
              focused={focused}
              onChange={onChange}
              registerTabPress={registerTabPress}
              tabPressed={tabPressed}
              toggleRawEdit={this.toggleRawEdit}
              {...this.props}
            />
            : <RichEditor
              editAsRaw={editAsRaw}
              handleBlur={handleBlur}
              handleFocus={handleFocus}
              handleSubmit={this.handleSubmit}
              focused={focused}
              onChange={onChange}
              toggleRawEdit={this.toggleRawEdit}
              {...this.props}
            />}
          <UnsavedLabel focused={focused} saved={saved} />
        </EditorWrapper>
        <EditorSave onClick={this.handleSubmit} saved={saved} focused={focused} />
      </div>
    );
  }
}
