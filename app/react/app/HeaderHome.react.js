/* @flow */
import Radium from 'radium';
import React from 'react';

import Container from '../components/Container.react';
import Image from '../components/Image.react';
import Menu from './menu/Menu.react';
import { colors } from '../globals';

@Radium
export default class Header extends React.PureComponent {
  static defaultProps = {
    projectName: 'Dev Project',
    userName: 'Admin'
  }
  props: {
    userName: string,
  }

  render() {
    const { userName } = this.props;

    return (
      <header style={styles.header}>
        <Container style={styles.container}>
          <Image src={'/assets/translationServerLogo.png'} style={styles.image} />
          <span style={styles.text}>Projects</span>
          <Menu style={styles.menu} user={userName} />
        </Container>
      </header>
    );
  }
}

const styles = {
  image: {
    cursor: 'pointer',
    marginRight: '20px',
    verticalAlign: 'middle',
    width: '16%'
  },
  header: {
    alignSelf: 'auto',
    flex: '0 0 auto',
    height: '50px',
    order: 0,
    padding: '10px 0px',
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: colors.white,
    boxShadow: '0 0 7px hsla(0, 0%, 0%, 0.1)',
    width: '100%',
    zIndex: '100'
  },
  menu: {
    display: 'inline',
    float: 'right'
  },
  container: {
    maxWidth: '90%'
  },
  text: {
    borderLeft: `1px solid ${colors.inputBorder}`,
    display: 'inline',
    fontSize: '20px',
    padding: '0 25px',
    verticalAlign: 'middle'
  }
};
