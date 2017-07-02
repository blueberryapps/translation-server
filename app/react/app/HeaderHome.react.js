/* @flow */
import Radium from 'radium';
import React from 'react';

import Logo from '../components/Logo.react';
import Menu from './menu/Menu.react';
import Separator from '../components/Separator.react';
import { colors } from '../globals';

@Radium
export default class Header extends React.PureComponent {
  static defaultProps = {
    projectName: 'Dev Project',
    userName: 'Admin'
  }
  props: {
    userName: string
  }

  render() {
    const { userName } = this.props;

    return (
      <header style={styles.header}>
        <div style={styles.logo.wrapper}>
          <div style={styles.image}>
            <Logo />
            <span style={styles.logo.text}>Translation Server</span>
          </div>
          <Separator />
          <span style={styles.text}>Projects</span>
        </div>
        <Menu style={styles.menu} user={userName} />
      </header>
    );
  }
}

const styles = {
  image: {
    display: 'flex',
    alignItems: 'center'
  },
  header: {
    flex: '0 0 auto',
    height: '65px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 10px',
    order: 0,
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: colors.white,
    boxShadow: '0 0 7px hsla(0, 0%, 0%, 0.1)',
    width: '100%',
    zIndex: 100
  },
  menu: {
    display: 'inline',
    float: 'right'
  },
  logo: {
    wrapper: {
      display: 'flex',
      alignItems: 'center'
    },
    text: {
      fontSize: '22px',
      display: 'block',
      margin: '0 20px 0 13px'
    }
  },
  text: {
    fontSize: '22px',
    padding: '0 25px'
  }
};
