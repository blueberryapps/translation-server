/* @flow */
import React from 'react';
import { Flex, Box } from 'radium-flex';
import Locale from './Locale';

import type { ProjectEntityType } from '../../../types/entityTypes';

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
          {defaultLocale &&
            <Locale {...defaultLocale} projectId={id} />
          }
          {translationLocales.map(locale => (
            <Locale {...locale} key={locale.id} projectId={id} />
          ))}
        </Flex>
      </div>
    );
  }
}
