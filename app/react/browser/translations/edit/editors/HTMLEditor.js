import React, { Component } from 'react';
import { Editor, EditorState } from 'draft-js';

export default class BooleanEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: true
    };
  }

  onChange = (value) => {
    this.props.onChange(value, this.props.fieldInfo);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.props.value, this.props.fieldInfo);
  }

  render() {
    const { value, dataType, saved } = this.props;

    return (
      <div>
        <Editor
          editorState={this.props.value}
          placeholder="Insert your Markup here"
          onChange={this.onChange}
        />
      </div>
    );
  }
}

const styles = {
  edited: {
    backgroundColor: 'green'
  }
};
