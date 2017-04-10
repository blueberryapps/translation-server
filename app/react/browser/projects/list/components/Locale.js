import React, { PropTypes as RPT } from 'react';
import { Flex, Box } from 'radium-flex';
import locale from 'country-language';
import { calculatePercents } from '../../helpers';

export default class Project extends React.PureComponent {
  static propTypes = {
    code: RPT.string.isRequired,
    translatedCount: RPT.number.isRequired,
    translationCount: RPT.number.isRequired,
  };
  render() {
    const { code, translationCount, translatedCount } = this.props;
    const language = locale.getLanguage(code).name[0];
    return (
      <Flex>
        <Box col={12}>{language}</Box>
        <Box col={12}>{translatedCount} / {translationCount}</Box>
        <Box col={12}>
          {calculatePercents(translatedCount, translationCount)}
          %
        </Box>
      </Flex>
    );
  }
}
