// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Flex, Box } from 'radium-flex';
import TranslateInput from '../../components/TranslateInput';
import { saveTranslation } from '../../../common/keys/actions';

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
};

@connect(() => ({}), {
  saveTranslation
})
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
      defaultLocaleId
    } = this.props;

    return (
      <Flex>
        <Box col={12}>
          {translationKey}
        </Box>
        <Box>
          {translations
            .filter(trans => +trans.localeId === defaultLocaleId)
            .map(translation => (
              <p>{translation.text || 'No default translation for this key'}</p>
            ))}
        </Box>
        <Box col={12}>
          {translations
            .filter(trans => +trans.localeId === +localeId)
            .map(translation => (
              <TranslateInput
                key={translation.id}
                dataType={dataType}
                note={note}
                onSave={this.props.saveTranslation}
                translation={translation}
              />
            ))}
        </Box>
      </Flex>
    );
  }
}
