/* @flow */
import Radium from 'radium';
import React from 'react';
import { Editor, EditorState, RichUtils, ContentState, convertFromHTML, CompositeDecorator } from 'draft-js';
import type { EditorState as EditorStateType } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

import BlockStyleControls from './components/BlockStyleControls';
import InlineStyleControls from './components/InlineStyleControls';
import LinkEntity from './LinkEntity';
import StylingControls from './components/StylingControls';
import ToggleHTMLButton from './components/ToggleHTMLButton';
import { colors } from '../../../../globals';

type PropTypes = {
  focused: boolean,
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

@Radium
export default class RichEditor extends React.Component {
  constructor(props: PropTypes) {
    super(props);
    const markup = convertFromHTML(props.value);
    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: LinkEntity,
      },
    ]);

    const editorState: EditorStateType = ContentState.createFromBlockArray(
      markup.contentBlocks,
      markup.entityMap
    );
    this.state = {
      editorState: EditorState.createWithContent(editorState, decorator),
      urlValue: '',
      urlError: false
    };
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

  promptForLink = (e: Event): void => {
    e.preventDefault();
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

      let url = '';
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }

      this.setState({
        showURLInput: true,
        urlValue: url,
      }, () => {
        setTimeout(() => this.url.focus(), 0);
      });
    }
  }

  onURLChange = (e: Event): void => {
    this.setState({
      urlValue: e.target.value,
      urlError: (!/^(f|ht)tps?:\/\//i.test(e.target.value))
    });
  }

  confirmLink = (e: Event): void => {
    e.preventDefault();
    const { editorState, urlValue, urlError } = this.state;
    if (urlError) return;

    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', { url: urlValue });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    this.setState({
      editorState: RichUtils.toggleLink(
       newEditorState,
       newEditorState.getSelection(),
       entityKey
      ),
      showURLInput: false,
      urlValue: '',
    }, () => {
      setTimeout(() => this.editor.focus(), 0);
    });
  }

  removeLink = (e) => {
    e.preventDefault();
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.setState({
        editorState: RichUtils.toggleLink(editorState, selection, null),
      });
    }
  }

  onLinkInputKeyDown = (e) => {
    if (e.which === 13) {
      this.confirmLink(e);
    }
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

  focus = () => this.editor.focus();

  render() {
    const { editorState, urlError }: StateTypes = this.state;
    const { focused, editAsRaw, toggleRawEdit }: PropTypes = this.props;
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
        <button onMouseDown={this.promptForLink}>
            Add Link
        </button>
        <button onMouseDown={this.removeLink}>
            Remove
        </button>
        {this.state.showURLInput &&
        <div style={styles.urlInputContainer}>
          <div style={styles.urlInputContainer}>
            <input
              onChange={this.onURLChange}
              ref={(elem: HTMLElement) => { this.url = elem; }}
              style={styles.urlInput}
              type="text"
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              value={this.state.urlValue}
              onKeyDown={this.onLinkInputKeyDown}
            />
            <button onMouseDown={this.confirmLink}>
              Confirm
            </button>
            {urlError && <span>Link have to start with http:&#47;&#47; or https:&#47;&#47;</span>}
          </div>
        </div>
        }
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
        <div className={className} style={[styles.editor, focused && styles.focused]}>
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

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}

const styles = {
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: '25px',
    fontSize: '15px',
    borderBottom: `1px solid ${colors.inputBorder}`
  },
  focused: {
    opacity: 1
  },
  editor: {
    paddingTop: '20px',
    opacity: .6,
    transition: 'opacity .2s'
  }
};
