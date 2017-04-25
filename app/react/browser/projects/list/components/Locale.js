/* @flow */
import React from 'react';
import { Flex, Box } from 'radium-flex';
import locale from 'country-language';
import { calculatePercents } from '../../helpers';

import type { LocaleT } from '../../types';

export default class Locale extends React.PureComponent {
  props: LocaleT
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
