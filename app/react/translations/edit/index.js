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
  changeField: Function,
  dataType: string,
  field: Object,
  handleChangeSelectedInput: Function,
  initField: Function,
  newTranslation: boolean,
  page: string,
  saveField: Function,
  selectedInput: number,
  registerTabPress: Function,
  tabPressed: ?boolean,
  translation: Object,
};

@toJS
class TranslationEditor extends PureComponent {
  state = {
    focused: false
  }

  componentDidMount() {
    const { page, translation: { id }, initField } = this.props;
    initField(page, id, this.props.field);
  }

  props: PropTypes

  handleBlur = () => this.setState({ focused: false });

  handleFocus = () => this.setState({ focused: true });

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
      registerTabPress,
      tabPressed,
      newTranslation
    } = this.props;
    const { focused } = this.state;
    const Editor = matchEditor[dataType];

    return (
      <div>
        <Editor
          fieldInfo={{ page, fieldId: id }}
          onSubmit={saveField}
          onChange={changeField}
          focused={focused}
          selectedInput={selectedInput}
          handleBlur={this.handleBlur}
          handleFocus={this.handleFocus}
          handleChangeSelectedInput={handleChangeSelectedInput}
          registerTabPress={registerTabPress}
          tabPressed={tabPressed}
          dataType={dataType}
          newTranslation={newTranslation}
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
