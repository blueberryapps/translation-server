/* @flow */
import React, { PureComponent } from 'react';

import StringEditor from './StringEditor';
import FloatEditor from './FloatEditor';
import BooleanEditor from './BooleanEditor';
import IntegerEditor from './IntegerEditor';
import ArrayEditor from './ArrayEditor';
import SymbolEditor from './SymbolEditor';

import type { TranslationType } from '../../translations/types';

const EditorTypeRegistry = {
  string: StringEditor,
  float: FloatEditor,
  boolean: BooleanEditor,
  integer: IntegerEditor,
  array: ArrayEditor,
  symbol: SymbolEditor,
};

export default class TranslateInput extends PureComponent {
  props: {
    dataType: string,
    onChange: Function,
    value: any,
    onSave: Function,
    translation: TranslationType
  };

  handleSave = () => this.props
    .onSave(this.props.value);

  render() {
    const {
      dataType,
      onChange,
      value,
      translation: {
        edited,
        localeId,
        text,
        id
      },
    } = this.props;
    const Editor = EditorTypeRegistry[dataType];
    return (
      <div>
        <Editor
          value={value}
          edited={edited}
          onChange={onChange}
          defaultValue={text}
          id={id}
          localeId={localeId}
        />
        <button onClick={this.handleSave}>Save</button>
      </div>
    );
  }
}
