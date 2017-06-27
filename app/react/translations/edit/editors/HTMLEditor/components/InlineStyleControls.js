/* @flow */
import React from 'react';
import type { EditorState } from 'draft-js';
import StyleButton from './StyleButton';
import ControlsWrapper from './ControlsWrapper';

type PropTypes = {
  editorState: EditorState,
  onToggle: Function
}

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD', content: <strong>Bold</strong> },
  { label: 'Italic', style: 'ITALIC', content: <i>Italic</i> },
  { label: 'Underline', style: 'UNDERLINE', content: <u>Underline</u> },
  { label: 'Monospace', style: 'CODE', content: <span style={{ fontFamily: '"Lucida Console", monospace' }}>&lt;&gt;</span> }
];

const InlineStyleControls = ({ editorState, onToggle }: PropTypes) => {
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <ControlsWrapper>
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        >
          {type.content && type.content}
        </StyleButton>
      )}
    </ControlsWrapper>
  );
};

export default InlineStyleControls;
