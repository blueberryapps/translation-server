/* @flow */
import Radium from 'radium';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Logo from '../components/Logo.react';
import Menu from './menu/Menu.react';
import Separator from '../components/Separator.react';
import Search from '../components/Search.react';
import { colors } from '../globals';
import { filterProjects } from '../projects/actions';

import type { HandleEventPayload } from '../components/handleEvent';

@connect(
  state => ({
    filterValue: state.projects.filterValue,
  }),
  dispatch => bindActionCreators({ filterProjects }, dispatch),
)
@Radium
export default class Header extends React.PureComponent {
  static defaultProps = {
    projectName: 'Dev Project',
    userName: 'Admin',
    filterProjects: () => {},
    filterValue: ''
  }

  props: {
    userName: string,
    filterProjects: Function,
    filterValue: ?string
  }

  handleClear = () => {
    this.props.filterProjects('');
  }

  handleChange = ({ value }: HandleEventPayload): void => {
    this.props.filterProjects(value || '');
  }

  render() {
    const { userName, filterValue } = this.props;

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
        <Search onChange={this.handleChange} onClear={this.handleClear} search={filterValue} noSearchButton />
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
  },
  field: {
    paddingRight: '40px'
  },
  fieldWrapper: {
    position: 'relative'
  },
  clearButton: {
    cursor: 'pointer',
    height: '40px',
    width: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 0,
    opacity: .5,
    top: 0,
    transition: 'opacity .2s',
    ':hover': {
      opacity: 1,
    }
  },
};
