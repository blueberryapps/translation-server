import React from 'react';
import { Editor, EditorState, RichUtils, ContentState, convertFromHTML } from 'draft-js';
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

const getBlockStyle = block =>
  (block.getType() === 'blockquote') && 'RichEditor-blockquote';

export default class RichEditor extends React.Component {
  constructor(props) {
    super(props);
    const markup = convertFromHTML(props.value);
    const editorState = ContentState.createFromBlockArray(
      markup.contentBlocks,
      markup.entityMap
    );
    this.state = { editorState: EditorState.createWithContent(editorState) };
    this.focus = () => this.editor.focus();
    this.handleKeyCommand = command => this._handleKeyCommand(command);
    this.onTab = e => this._onTab(e);
    this.onChange = (newEditorState) => {
      // this.setState({ newEditorState });
      this._handleChange(newEditorState);
    };
    this.toggleBlockType = type => this._toggleBlockType(type);
    this.toggleInlineStyle = style => this._toggleInlineStyle(style);
  }

  props: PropTypes

  _handleKeyCommand(command) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }
  _onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }
  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }
  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle),
    );
  }

  _handleChange = (editorState) => {
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
            onChange={this.onChange}
            onTab={this.onTab}
            placeholder="Insert your translation"
            ref={(elem) => { this.editor = elem; }}
            spellCheck
          />
        </div>
      </div>
    );
  }
}
