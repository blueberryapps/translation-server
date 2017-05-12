/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SimpleEditor, BooleanEditor, HTMLEditor } from './editors';
import * as actions from '../../forms/actions';
import toJS from '../../utils/toJS';

const matchEditor = {
  float: SimpleEditor,
  string: SimpleEditor,
  integer: SimpleEditor,
  array: SimpleEditor,
  boolean: BooleanEditor,
  symbol: SimpleEditor,
  html: HTMLEditor
};

type PropTypes = {
  field: Object,
  dataType: string,
  translation: Object,
  page: string,
  pressedKeyCode: ?number,
  registerPressKey: Function,
  changeField: Function,
  saveField: Function,
  initField: Function
};

@toJS
class TranslationEditor extends Component {
  componentDidMount() {
    const { page, translation: { id }, initField } = this.props;
    initField(page, id, this.props.field);
  }

  props: PropTypes

  render() {
    const {
      field,
      dataType,
      translation: { id },
      page,
      changeField,
      saveField,
      registerPressKey,
      pressedKeyCode
    } = this.props;

    const Editor = matchEditor[dataType];

    return (
      <div>
        <Editor
          fieldInfo={{ page, fieldId: id }}
          onSubmit={saveField}
          onChange={changeField}
          registerPressKey={registerPressKey}
          pressedKeyCode={pressedKeyCode}
          dataType={dataType}
          value={field && field.value}
          saved={field && field.saved}
        />
        {!field.saved && <span>Unsaved</span>}
      </div>
    );
  }
}

// Flow-Type doesn't like decorators
export default connect((state, { page, translation: { id, text } }) => {
  const pages = state.forms.getIn(['translations', 'pages']);
  return {
    field: pages.getIn([page, id]) || { value: text, saved: true }
  };
}, actions)(TranslationEditor);
