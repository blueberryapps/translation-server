import React, { PureComponent, PropTypes as RPT } from 'react';
import { Flex, Box } from 'radium-flex';
import TranslateInput from '../../components/TranslateInput.react';

export default class Translation extends PureComponent {
  static defaultProps = {
    note: '',
  };
  static propTypes = {
    id: RPT.number.isRequired,
    translationKey: RPT.string.isRequired,
    note: RPT.string,
    localeId: RPT.string.isRequired,
    translations: RPT.arrayOf(
      RPT.shape({
        edited: RPT.bool,
        id: RPT.number,
        keyId: RPT.number,
        localeId: RPT.number,
        text: RPT.string,
      }),
    ).isRequired,
  };
  render() {
    const { translationKey, translations, localeId } = this.props;
    return (
      <Flex>
        <Box col={12}>
          {translationKey}
        </Box>
        <Box col={12}>
          {translations
            .filter(trans => trans.localeId === localeId)
            .map(trans => <TranslateInput {...trans} />)}
        </Box>
      </Flex>
    );
  }
}
