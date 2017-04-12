import Radium from 'radium';
import React, { PropTypes as RPT } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Button from '../components/Button.react';
import Image from '../components/Image.react';
import Menu from './menu/Menu.react';
import Search from '../components/Search.react';
import { colors, media } from '../globals';

@connect(() => ({}), dispatch => bindActionCreators({ push }, dispatch))
@Radium
export default class Header extends React.PureComponent {
  static propTypes = {
    menuShown: RPT.bool.isRequired,
    projectName: RPT.string,
    push: RPT.func.isRequired,
    userName: RPT.string,
  };

  static defaultProps = {
    menuShown: true,
    projectName: 'Dev Project',
    userName: 'Admin',
  };

  handleClick() {
    const { push } = this.props;

    push('/');
  }

  render() {
    const { menuShown, projectName, userName } = this.props;

    return (
      <div style={styles.wrapper}>
        <header style={styles.header}>
          <Image
            src={'/assets/backArrow.png'}
            style={styles.backButton}
            onClick={this.handleClick.bind(this)}
          />
          <span style={styles.projectName}>{projectName}</span>
          <span style={styles.text}>Translations</span>
          <Search />
          <div style={styles.saveAllWrapper}>
            <Button style={styles.saveAll}>Save all</Button>
          </div>
          <Menu style={styles.menu} menuShown={menuShown} user={userName} />
        </header>
      </div>
    );
  }
}

const styles = {
  wrapper: {
    paddingRight: 0,
    paddingLeft: 0,
    [media.l]: {
      paddingRight: '30px',
      paddingLeft: '30px',
    },
  },

  backButton: {
    marginRight: '15px',
    width: '10px',
    [media.l]: {
      marginRight: '25px',
    },
  },

  header: {
    alignSelf: 'auto',
    flex: '0 0 auto',
    height: '50px',
    order: '0',
    padding: '10px 0px',
    position: 'relative',
    width: '100%',
    verticalAlign: 'middle',
    zIndex: '100',
  },

  menu: {
    borderLeft: `1px solid ${colors.inputBorder}`,
    display: 'inline',
    fontSize: '16px',
    paddingLeft: '10px',
    [media.l]: {
      fontSize: '20px',
      paddingLeft: '30px',
    },
  },

  projectName: {
    borderLeft: `1px solid ${colors.inputBorder}`,
    fontSize: '15px',
    padding: '0 10px',
    verticalAlign: 'middle',
    [media.l]: {
      fontSize: '20px',
      padding: '0 25px',
    },
  },

  saveAllWrapper: {
    display: 'inline',
    marginRight: '30px',
    marginLeft: 0,
    verticalAlign: 'middle',
    [media.l]: {
      marginLeft: '15%',
      marginRight: '30px',
    },
  },

  saveAll: {
    backgroundColor: colors.green,
    fontSize: '1em',
    padding: '7px 20px',
  },

  text: {
    display: 'inline-block',
    fontSize: '16px',
    verticalAlign: 'middle',
    [media.l]: {
      fontSize: '20px',
    },
  },
};
