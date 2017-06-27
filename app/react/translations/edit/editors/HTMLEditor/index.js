/* @flow */
import React from 'react';

import EditorSave from '../EditorSave';
import EditorWrapper from '../EditorWrapper';
import RawEditor from './RawEditor';
import RichEditor from './RichEditor';

import type { FieldInfo } from '../../index';

type PropTypes = {
  onSubmit: Function,
  onChange: Function,
  value: string,
  saved: boolean,
  registerTabPress: Function,
  tabPressed: ?boolean,
  fieldInfo: FieldInfo
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
    const { onChange, saved, registerTabPress, tabPressed } = this.props;

    return (
      <div>
        <EditorWrapper>
          {this.state.editAsRaw
            ? <RawEditor
              editAsRaw={editAsRaw}
              onChange={onChange}
              toggleRawEdit={this.toggleRawEdit}
              registerTabPress={registerTabPress}
              tabPressed={tabPressed}
              handleSubmit={this.handleSubmit}
              {...this.props}
            />
            : <RichEditor
              editAsRaw={editAsRaw}
              onChange={onChange}
              handleSubmit={this.handleSubmit}
              toggleRawEdit={this.toggleRawEdit}
              {...this.props}
            />}
        </EditorWrapper>
        <EditorSave onClick={this.handleSubmit} saved={saved} />
      </div>
    );
  }
}
