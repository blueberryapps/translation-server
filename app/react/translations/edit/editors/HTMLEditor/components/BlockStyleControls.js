/* @flow */
import Radium from 'radium';
import React, { PureComponent } from 'react';
import type { EditorState } from 'draft-js';

import Icon from '../../../../../components/Icon.react';
import { colors } from '../../../../../globals';

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

@Radium
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
      <div style={styles.wrapper}>
        <Icon kind="letter" size={14} style={[styles.icon.base, styles.icon.letter]} />
        <select onChange={this.handleChange} value={blockType} style={styles.select}>
          {BLOCK_TYPES.map(type =>
            <option
              key={type.label}
              label={type.label}
              value={type.style}
            />
          )}
        </select>
        <Icon kind="arrow" size={6} style={[styles.icon.base, styles.icon.arrow]} />
      </div>
    );
  }
}

const styles = {
  select: {
    border: `1px solid ${colors.inputBorder}`,
    backgroundColor: colors.white,
    borderRadius: 0,
    paddingLeft: '33px',
    paddingRight: '15px',
    width: '150px',
    WebkitAppearance: 'none',
    ':focus': {
      outline: 'none'
    }
  },
  wrapper: {
    display: 'flex',
    position: 'relative'
  },
  icon: {
    base: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)'
    },
    letter: {
      left: '12px'
    },
    arrow: {
      right: '15px'
    }
  }
};
