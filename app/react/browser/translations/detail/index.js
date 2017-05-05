// @flow
import React, { PureComponent } from 'react';
import { Flex, Box } from 'radium-flex';
import TranslationEditor from '../edit';

type TranslationType = {
  edited: boolean,
  id: number,
  keyId: number,
  localeId: number,
  text: string,
};

type TranslationProps = {
  translationKey: string,
  note?: string,
  dataType: string,
  defaultTranslation: TranslationType,
  currentTranslation: TranslationType,
  keyId: string,
  localeId: number,
  // fillTranslation: Function,
  // saveTranslation: Function,
};

export default class Translation extends PureComponent {
  static defaultProps = {
    note: '',
  };
  props: TranslationProps;
  render() {
    const {
      defaultTranslation,
      currentTranslation,
      dataType,
      note,
      registerPressKey,
      pressedKeyCode,
      page,
    } = this.props;

    return (
      <Flex>
        <Box col={12}>
          {this.props.translationKey}
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
