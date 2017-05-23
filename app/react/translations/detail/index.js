/* @flow */
import React, { PureComponent } from 'react';
import TranslationEditor from '../edit';

import type { TranslationEntityType } from '../../types/entityTypes';

import SimpleRenderer from './renderers/SimpleRenderer';
import HTMLRenderer from './renderers/HTMLRenderer';
import ArrayRenderer from './renderers/ArrayRenderer';
import BooleanRenderer from './renderers/BooleanRenderer';

const typeRegistry = {
  html: HTMLRenderer,
  array: ArrayRenderer,
  boolean: BooleanRenderer,
  string: SimpleRenderer,
  symbol: SimpleRenderer,
  integer: SimpleRenderer,
  float: SimpleRenderer,
};

type PropTypes = {
  defaultTranslation: TranslationEntityType,
  currentTranslation: TranslationEntityType,
  dataType: string,
  note?: string,
  pressedKeyCode: ?number,
  page: string,
  translationKey: string,
  registerPressKey: Function,
};

export default class Translation extends PureComponent {
  static defaultProps = {
    note: '',
  };
  props: PropTypes;

  render() {
    const {
      defaultTranslation,
      currentTranslation,
      dataType,
      note,
      registerPressKey,
      pressedKeyCode,
      page,
      translationKey
    } = this.props;
    const shouldRenderDefaultTranslation = defaultTranslation && (defaultTranslation.id !== currentTranslation.id);

    const DefaultTranslation = typeRegistry[dataType];

    return (
      <div>
        <div>
          {translationKey}
        </div>
        <div>
          {note}
        </div>
        {shouldRenderDefaultTranslation && (
          // this subcompontent exists to make styling easier later
          <DefaultTranslation
            value={defaultTranslation.text}
          />
        )}
        <div>
          <TranslationEditor
            translation={currentTranslation}
            dataType={dataType}
            registerPressKey={registerPressKey}
            pressedKeyCode={pressedKeyCode}
            page={page}
          />
        </div>
      </div>
    );
  }
}
