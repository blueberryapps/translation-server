import React, { PropTypes as RPT } from 'react';
import { Link } from 'react-router';
import { Flex, Box } from 'radium-flex';
import Locale from './Locale';

export default class Project extends React.PureComponent {
  static defaultProps = {
    defaultLocale: '',
  };

  static propTypes = {
    name: RPT.string.isRequired,
    defaultLocale: RPT.string,
    id: RPT.number.isRequired,
    locales: RPT.arrayOf(RPT.object).isRequired,
  };
  render() {
    const {
      name,
      defaultLocale,
      locales,
      id,
    } = this.props;
    return (
      <div>
        <Flex>
          <Box col={4}>Project</Box>
          <Box col={2}>Original</Box>
          <Box col={6}>Translations</Box>
        </Flex>
        <Flex>
          <Box col={4}>{name}</Box>
          <Box col={2}>{defaultLocale}</Box>
          {locales.map(locale => (
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
