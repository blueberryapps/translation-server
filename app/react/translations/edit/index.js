/* @flow */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { SimpleEditor, BooleanEditor, HTMLEditor, ArrayEditor } from './editors';
import * as actions from '../../forms/translations/actions';
import toJS from '../../utils/toJS';

export type FieldInfo = {
  page: string,
  fieldId: number
};

const matchEditor = {
  float: SimpleEditor,
  string: SimpleEditor,
  integer: SimpleEditor,
  array: ArrayEditor,
  boolean: BooleanEditor,
  symbol: SimpleEditor,
  html: HTMLEditor
};

type PropTypes = {
  field: Object,
  dataType: string,
  handleChangeSelectedInput: Function,
  translation: Object,
  page: string,
  pressedKeyCode: ?number,
  selectedInput: number,
  registerPressKey: Function,
  changeField: Function,
  saveField: Function,
  initField: Function
};

@toJS
class TranslationEditor extends PureComponent {
  componentDidMount() {
    const { page, translation: { id }, initField } = this.props;
    initField(page, id, this.props.field);
  }

  props: PropTypes

  render() {
    const {
      field,
      dataType,
      handleChangeSelectedInput,
      translation: { id },
      page,
      changeField,
      saveField,
      selectedInput,
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
          selectedInput={selectedInput}
          handleChangeSelectedInput={handleChangeSelectedInput}
          registerPressKey={registerPressKey}
          pressedKeyCode={pressedKeyCode}
          dataType={dataType}
          value={field && field.value}
          saved={field && field.saved}
        />
      </div>
    );
  }
}

// Flow-Type doesn't like decorators
export default connect((state, { page, translation: { id, text } }) => {
  const pages = state.forms.translations.get('pages');
  return {
    field: pages.getIn([page, id]) || { value: text, saved: true }
  };
}, actions)(TranslationEditor);
