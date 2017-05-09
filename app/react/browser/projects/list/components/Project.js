/* @flow */
import React from 'react';
import { Link } from 'react-router';
import { Flex, Box } from 'radium-flex';
import Locale from './Locale';

import type { ProjectEntityType } from '../../../../common/types/entityTypes';

export default class Project extends React.PureComponent {
  props: ProjectEntityType

  render() {
    const {
      name,
      locales,
      id,
      defaultLocaleId
    } = this.props;

    const defaultLocale = locales
      .filter(locale => locale.id === defaultLocaleId)[0];

    const translationLocales = locales
      .filter(locale => locale.id !== defaultLocaleId);

    return (
      <div>
        <Flex>
          <Box col={4}>Project</Box>
          <Box col={2}>Original</Box>
          <Box col={6}>Translations</Box>
        </Flex>
        <Flex>
          <Box col={4}>{name}</Box>
          <Box col={2}>
            <Link to={`project/${id}/locales/${defaultLocale.id}?page=1`}>
              <Locale {...defaultLocale} />
            </Link>
          </Box>
          {translationLocales.map(locale => (
            <Box key={locale.id} col={2}>
              <Link to={`project/${id}/locales/${locale.id}?page=1`}>
                <Locale {...locale} />
              </Link>
            </Box>
          ))}
        </Flex>
      </div>
    );
  }
}
