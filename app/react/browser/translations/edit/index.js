import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SimpleEditor } from './editors';
import * as actions from '../../../common/forms/actions';

const matchEditor = {
  float: SimpleEditor,
  string: SimpleEditor,
  integer: SimpleEditor,
  array: SimpleEditor,
  boolean: SimpleEditor,
  symbol: SimpleEditor,
};

@connect((state, { page, translation: { id } }) => {
  const pages = state.forms.getIn(['translations', 'pages']);
  // console.log('pre', id, !pages.isEmpty() && pages.get(page).toJS(), !pages.isEmpty() && pages.get(page) && pages.get(page).get(id))
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

  // componentWillReceiveProps({ initField, translation: { page, id, text } }) {
  //   // console.log('changing', this.props.translation.id !== id)
  //   if (this.props.translation.id !== id) initField(page, id, text)
  // }

  render() {
    const {
      field,
      dataType,
      translation: { text, id },
      page,
      changeField,
      saveField
    } = this.props;
    // console.log('field', field)
    const Editor = matchEditor[dataType];
    return (
      <div>
        <Editor
          // identificator={id}
          fieldInfo={{ page, fieldId: id }}
          onSubmit={saveField}
          onChange={changeField}
          onError
          dataType={dataType}
          saved={field.get('saved')}
          value={field.get('value')}
        />
      </div>
    );
  }
}
