// @flow
import React, { PureComponent } from 'react';
import { Flex, Box } from 'radium-flex';
import TranslateInput from '../../components/TranslateInput';

type TranslationType = {
  edited: boolean,
  id: number,
  keyId: number,
  localeId: number,
  text: string
};

type TranslationProps = {
  translationKey: string,
  note?: string,
  saveTranslation: Function,
  localeId: string,
  dataType: string,
  translations: Array<TranslationType>,
  defaultLocaleId: string,
  fillTranslation: Function,
  values: Object
};

export default class Translation extends PureComponent {
  static defaultProps = {
    note: '',
  };
  props: TranslationProps

  render() {
    const {
      translationKey,
      translations,
      localeId,
      dataType,
      note,
      defaultLocaleId,
      fillTranslation,
      values
    } = this.props;

    return (
      <Flex>
        <Box col={12}>
          {translationKey}
        </Box>
        <Box>
          {/* DEFAULT TRANSLATION TEXT */}
        </Box>
        <Box col={12}>
          {/* {translations
            .filter(trans => +trans.localeId === +localeId)
            .map(translation => (
              <TranslateInput
                key={translation.id}
                dataType={dataType}
                note={note}
                value={values.get(translation.id).value}
                onChange={fillTranslation.bind(null, localeId, translation.id)}
                onSave={this.props.saveTranslation.bind(null, localeId, translation.id)}
                translation={translation}
              />
            ))} */}
        </Box>
      </Flex>
    );
  }
}
