/* @flow */
import React from 'react';
import type { EditorState } from 'draft-js';

import ControlsWrapper from './ControlsWrapper';
import Icon from '../../../../../components/Icon.react';
import StyleButton from './StyleButton';

type PropTypes = {
  editorState: EditorState,
  onToggle: Function
}

const STYLING_STYLES = [
  { label: 'UL', style: 'unordered-list-item', content: <Icon kind="unordered-list" size={20} style={{ fill: 'currentColor' }} /> },
  { label: 'OL', style: 'ordered-list-item', content: <Icon kind="ordered-list" size={20} style={{ fill: 'currentColor' }} /> },
];

const StylingControls = ({ editorState, onToggle }: PropTypes) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <ControlsWrapper>
      {STYLING_STYLES.map(type =>
        (<StyleButton
          key={type.label}
          active={type.style === blockType}
          onToggle={onToggle}
          style={type.style}
        >
          {type.content && type.content}
        </StyleButton>)
      )}
    </ControlsWrapper>
  );
};

export default StylingControls;
