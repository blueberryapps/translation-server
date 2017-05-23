/* @flow */
import React from 'react';

import RawEditor from './RawEditor';
import RichEditor from './RichEditor';

import type { FieldInfo } from '../../index';

type PropTypes = {
  onSubmit: Function,
  onChange: Function,
  value: string,
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

  handleSubmit = (event: Event) => {
    event.preventDefault();
    this.props.onSubmit(this.props.value, this.props.fieldInfo);
  }

  toggleRawEdit = () =>
    this.setState({ editAsRaw: !this.state.editAsRaw })

  render() {
    const { editAsRaw } = this.state;
    const { onChange } = this.props;
    return (
      <div>
        {this.state.editAsRaw
          ? <RawEditor
            editAsRaw={editAsRaw}
            onChange={onChange}
            toggleRawEdit={this.toggleRawEdit}
            {...this.props}
          />
          : <RichEditor
            editAsRaw={editAsRaw}
            onChange={onChange}
            toggleRawEdit={this.toggleRawEdit}
            {...this.props}
          />}
        <button onClick={this.handleSubmit}>
          Save
        </button>
      </div>
    );
  }
}
