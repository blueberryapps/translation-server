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
  // console.log('[agas]', pages)
  return {
    // eslint-disable-next-line
    field: pages && pages.get(page) && pages.get(page).get(id).toJS() || {}
  };
}, actions)
export default class TranslationEditor extends Component {
  componentDidMount() {
    const { page, translation: { id, text } } = this.props;
    this.props.initField(page, id, text);
  }

  render() {
    const {
      field,
      dataType,
      translation: { text, id },
      page,
      changeField,
      saveField
    } = this.props;

    const Editor = matchEditor[dataType];

    return (
      <div>
        <Editor
          // identificator={id}
          onSubmit={saveField.bind(null, page, id)}
          onChange={changeField.bind(null, page, id)}
          onError
          saved={field.saved}
          value={field.value}
        />
      </div>
    );
  }
}
