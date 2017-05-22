/* @flow */
import React from 'react';
import { Editor, EditorState, RichUtils, ContentState, convertFromHTML } from 'draft-js';
import type { EditorState as EditorStateType } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

import BlockStyleControls from './components/BlockStyleControls';
import InlineStyleControls from './components/InlineStyleControls';
import ToggleHTMLButton from './components/ToggleHTMLButton';

type PropTypes = {
  onChange: Function,
  toggleRawEdit: Function,
  value: string,
  editAsRaw: boolean,
  fieldInfo: Object
}

type StateTypes = {
  editorState: EditorStateType
}

const getBlockStyle = block =>
  (block.getType() === 'blockquote') && 'RichEditor-blockquote';

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

  handleKeyCommand = (command: string) => {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.handleChange(newState);
      return true;
    }
    return false;
  }
  onTab = (e: Event) => {
    const maxDepth = 4;
    this.handleChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }
  toggleBlockType = (blockType: string) => {
    this.handleChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }
  toggleInlineStyle = (inlineStyle: string) => {
    this.handleChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle),
    );
  }

  handleChange = (editorState: EditorStateType) => {
    this.setState({ editorState });
    const value = stateToHTML(editorState.getCurrentContent());
    this.props.onChange(value, this.props.fieldInfo);
  };

  render() {
    const { editorState } = this.state;
    const { editAsRaw, toggleRawEdit } = this.props;
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
        <ToggleHTMLButton
          editAsRaw={editAsRaw}
          toggleRawEdit={toggleRawEdit}
        />
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <div className={className}>
          <Editor
            blockStyleFn={getBlockStyle}
            onClick={this.focus}
            // customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.handleChange}
            onTab={this.onTab}
            placeholder="Insert your translation"
            ref={(elem: HTMLElement) => { this.editor = elem; }}
            spellCheck
          />
        </div>
      </div>
    );
  }
}
