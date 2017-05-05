import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SimpleEditor, BooleanEditor, HTMLEditor } from './editors';
import * as actions from '../../../common/forms/actions';

const matchEditor = {
  float: SimpleEditor,
  string: SimpleEditor,
  integer: SimpleEditor,
  array: SimpleEditor,
  boolean: BooleanEditor,
  symbol: SimpleEditor,
  html: HTMLEditor
};

@connect((state, { page, translation: { id } }) => {
  const pages = state.forms.getIn(['translations', 'pages']);
  return {
    // eslint-disable-next-line
    field: !pages.isEmpty() && pages.get(page) && pages.get(page).get(id) || new Map()
  };
}, actions)
export default class TranslationEditor extends Component {
  componentDidMount() {
    const { page, translation: { id, text } } = this.props;
    const field = this.props.field.size ? this.props.field : { value: text, saved: true};

    this.props.initField(page, id, field);
  }

  render() {
    const {
      field,
      dataType,
      translation: { text, id },
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
          onError
          registerPressKey={registerPressKey}
          pressedKeyCode={pressedKeyCode}
          dataType={dataType}
          saved={field.get('saved')}
          value={field.get('value')}
        />
      </div>
    );
  }
}
