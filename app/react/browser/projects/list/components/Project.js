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
    locales: RPT.arrayOf(RPT.object).isRequired,
  };
  render() {
    return (
      <div>
        <Flex>
          <Box col={4}>Project</Box>
          <Box col={2}>Original</Box>
          <Box col={6}>Translations</Box>
        </Flex>
        <Flex>
          <Box col={4}>{this.props.name}</Box>
          <Box col={2}>{this.props.defaultLocale}</Box>
          {this.props.locales.map(locale => (
            <Box key={locale.id} col={2}>
              <Link to={`react/locales/${locale.id}`}>
                <Locale {...locale} />
              </Link>
            </Box>
          ))}
        </Flex>
      </div>
    );
  }
}
