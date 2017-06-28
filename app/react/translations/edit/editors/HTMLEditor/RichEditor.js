/* @flow */
import React from 'react';
import { Editor, EditorState, RichUtils, ContentState, convertFromHTML } from 'draft-js';
import type { EditorState as EditorStateType } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

import BlockStyleControls from './components/BlockStyleControls';
import InlineStyleControls from './components/InlineStyleControls';
import StylingControls from './components/StylingControls';
import ToggleHTMLButton from './components/ToggleHTMLButton';
import { colors } from '../../../../globals';

type PropTypes = {
  onChange: Function,
  toggleRawEdit: Function,
  handleSubmit: Function,
  value: string,
  handleBlur: Function,
  handleFocus: Function,
  editAsRaw: boolean,
  fieldInfo: Object
}

type StateTypes = {
  editorState: EditorStateType
}

export default class RichEditor extends React.Component {
  constructor(props: PropTypes) {
    super(props);
    const markup = convertFromHTML(props.value);

    const editorState: EditorStateType = ContentState.createFromBlockArray(
      markup.contentBlocks,
      markup.entityMap
    );
    this.state = { editorState: EditorState.createWithContent(editorState) };
    this.focus = () => this.editor.focus();
  }

  // eslint-disable-next-line react/sort-comp
  editor: HTMLElement
  focus: Function
  state: StateTypes
  props: PropTypes
  onTab: Function
  onChange: Function

  handleKeyCommand = (command: string): boolean => {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.handleChange(newState);
      return true;
    }
    return false;
  }

  handleBlur = () => this.props.handleBlur();

  handleFocus = () => this.props.handleFocus();

  onTab = (e: Event): void => {
    const maxDepth = 4;
    this.props.handleSubmit();
    this.handleChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  toggleBlockType = (blockType: string): void => {
    this.handleChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  toggleStylingType = (blockType: string): void => {
    this.handleChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  toggleInlineStyle = (inlineStyle: string): void => {
    this.handleChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle),
    );
  }

  handleChange = (editorState: EditorStateType): void => {
    this.setState({ editorState });
    const value = stateToHTML(editorState.getCurrentContent());
    this.props.onChange(value, this.props.fieldInfo);
  };

  render() {
    const { editorState }: StateTypes = this.state;
    const { editAsRaw, toggleRawEdit }: PropTypes = this.props;
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }
    return (
      <div className="RichEditor-root">
        <div style={styles.controls}>
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
          <StylingControls
            editorState={editorState}
            onToggle={this.toggleStylingType}
          />
          <ToggleHTMLButton
            editAsRaw={editAsRaw}
            toggleRawEdit={toggleRawEdit}
          />
        </div>
        <div className={className}>
          <Editor
            onClick={this.focus}
            // customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.handleChange}
            onTab={this.onTab}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            placeholder="Insert your translation"
            ref={(elem: HTMLElement) => { this.editor = elem; }}
            spellCheck
          />
        </div>
      </div>
    );
  }
}

const styles = {
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: '25px',
    borderBottom: `1px solid ${colors.inputBorder}`
  }
};
