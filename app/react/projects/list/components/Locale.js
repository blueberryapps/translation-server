/* @flow */
import React from 'react';
import { Flex, Box } from 'radium-flex';
import { Link } from 'react-router';
import locale from 'country-language';

import { calculatePercents } from '../../helpers';

import type { ID } from '../../../types/generalTypes';
import type { LocaleEntityType } from '../../../types/entityTypes';

export default class Locale extends React.PureComponent {
  props: LocaleEntityType & {
    projectId: ID
  }

  render() {
    const { projectId, code, translationCount, translatedCount, id } = this.props;
    const language = locale.getLanguage(code).name[0];
    return (
      <Box col={2}>
        <Link to={`project/${projectId}/locales/${id}/translations?page=1&edited=all`}>
          <Flex>
            <Box col={12}>{language}</Box>
            <Box col={12}>{translatedCount} / {translationCount}</Box>
            <Box col={12}>
              {`${calculatePercents(translatedCount, translationCount)} %`}
            </Box>
          </Flex>
        </Link>
        {!!+translatedCount && !!+translationCount &&
          <Link to={`project/${projectId}/locales/${id}/releases`}>
            Release
          </Link>}
      </Box>
    );
  }
}
