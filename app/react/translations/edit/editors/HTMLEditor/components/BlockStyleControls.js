/* @flow */
import React, { PureComponent } from 'react';
import type { EditorState } from 'draft-js';

type PropTypes = {
  editorState: EditorState,
  onToggle: Function
};

const BLOCK_TYPES = [
  { label: 'Normal text', style: 'unstyled' },
  { label: 'Heading 1', style: 'header-one' },
  { label: 'Heading 2', style: 'header-two' },
  { label: 'Heading 3', style: 'header-three' },
  { label: 'Heading 4', style: 'header-four' },
  { label: 'Heading 5', style: 'header-five' },
  { label: 'Heading 6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'Code Block', style: 'code-block' },
];


export default class BlockStyleControls extends PureComponent {
  props: PropTypes

  handleChange = ({ target: { value } }) => {
    this.props.onToggle(value);
  }

  render() {
    const { editorState } = this.props;
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    return (
      <select onChange={this.handleChange} value={blockType}>
        {BLOCK_TYPES.map(type =>
          <option
            key={type.label}
            label={type.label}
            value={type.style}
          />
        )}
      </select>
    );
  }
}
