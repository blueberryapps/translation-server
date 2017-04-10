import React, { PropTypes as RPT } from 'react';
import { Flex, Box } from 'radium-flex';
import { calculatePercents } from '../../helpers';

export default class Project extends React.PureComponent {
  static propTypes = {
    code: RPT.string.isRequired,
    translatedCount: RPT.number.isRequired,
    translationCount: RPT.number.isRequired,
  };
  render() {
    const { code, translationCount, translatedCount } = this.props;
    return (
      <Flex>
        <Box col={12}>{code}</Box>
        <Box col={12}>{translatedCount} / {translationCount}</Box>
        <Box col={12}>
          {calculatePercents(translatedCount, translationCount)}
          %
        </Box>
      </Flex>
    );
  }
}
