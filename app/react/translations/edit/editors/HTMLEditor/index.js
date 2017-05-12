/* @flow */
import React from 'react';

import RawEditor from './RawEditor';
import RichEditor from './RichEditor';

type PropTypes = {
  onSubmit: Function,
  // eslint-disable-next-line react/no-unused-prop-types
  onChange: Function,
  value: string,
  fieldInfo: Object
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
    return (
      <div>
        {this.state.editAsRaw
          ? <RawEditor
            editAsRaw={editAsRaw}
            toggleRawEdit={this.toggleRawEdit}
            {...this.props}
          />
          : <RichEditor
            editAsRaw={editAsRaw}
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
