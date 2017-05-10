/* @flow */
import React, { PureComponent } from 'react';
import { Flex, Box } from 'radium-flex';
import TranslationEditor from '../edit';

import type { TranslationEntityType } from '../../types/entityTypes';

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

    return (
      <Flex>
        <Box col={12}>
          {translationKey}
        </Box>
        <Box>
          {note}
        </Box>
        <Box>
          {defaultTranslation
            ? defaultTranslation.text
            : 'No default translation'}
        </Box>
        <Box col={12}>
          <TranslationEditor
            translation={currentTranslation}
            dataType={dataType}
            registerPressKey={registerPressKey}
            pressedKeyCode={pressedKeyCode}
            page={page}
          />
        </Box>
      </Flex>
    );
  }
}
