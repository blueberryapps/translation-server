/* @flow */
import React from 'react';
import { Flex, Box } from 'radium-flex';
import Locale from './Locale.react';
import { media } from '../../../globals';


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
        <Flex style={styles.row}>
          <Box col={4} xs={6} ms={6} sm={3} md={4} lg={4}>
            <div style={styles.name}>{name}</div>
          </Box>
          <Box col={4} xs={6} ms={6} sm={3} md={2} lg={2}>
            {defaultLocale && <Locale projectd={id} {...defaultLocale} />}
          </Box>
          <Box col={4} xs={12} ms={12} sm={6} md={6} lg={6}>
            <Flex>
              {translationLocales.map(locale => (
                <Box col={4} xs={6} ms={3} sm={6} md={4} lg={4}>
                  <Locale projectd={id} {...locale} />
                </Box>
              ))}
            </Flex>
          </Box>
        </Flex>
      </div>
    );
  }
}

const styles = {
  row: {
    marginTop: '25px'
  },
  name: {
    display: 'flex',
    alignItems: 'center',
    height: '135px',
    fontSize: '22px',
    fontWeight: 300,
    boxShadow: '0px 0px 10px -4px rgba(135,132,135,1)',
    paddingLeft: '15px',
    [media.ml]: {
      paddingLeft: '50px'
    }
  }
};
