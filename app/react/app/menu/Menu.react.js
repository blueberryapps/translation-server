/* @flow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import autobind from 'core-decorators/lib/autobind';
import Radium from 'radium';
import React from 'react';

import Image from '../../components/Image.react';
import { colors } from '../../globals';

@Radium
export default class Menu extends React.PureComponent {
  static defaultProps = {
    style: {}
  }

  state = {
    visibility: false
  }

  props: {
    style: Object | Array<string>,
    user: string,
  }

  @autobind
  handleClick() {
    this.setState({ visibility: !this.state.visibility });
  }

  handleSignOut = () => {
    fetch('/users/sign_out', { method: 'DELETE' });
    window.location.href = '/users/sign_in';
  }

  redicertToOldVersion = () => { window.location.href = '/'; }

  render() {
    const { user, style } = this.props;
    const { visibility } = this.state;

    return (
      <div style={[styles.dropdown, style]}>
        <span onClick={this.handleClick}>
          <Image style={styles.userIcon} src={'/assets/userIcon.png'} />
          {user}
        </span>
        {/* $FlowFixMe */}
        <ul style={[styles.dropdownList, styles.dropdownVisibility[visibility]]}>
          <li
            style={styles.dropdownElement}
            key="oldVersion"
            onClick={this.redicertToOldVersion}
          >
            Old version
          </li>
          <li
            style={styles.dropdownElement}
            key="signOut"
            onClick={this.handleSignOut}
          >
            Sign out
          </li>
        </ul>
      </div>
    );
  }
}

const styles = {
  dropdown: {
    position: 'relative',
    display: 'inline-block',
  },

  dropdownVisibility: {
    true: {
      display: 'block'
    },
    false: {
      display: 'none'
    }
  },

  dropdownList: {
    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
    left: '-45px',
    listStyle: 'none',
    paddingLeft: '0px',
    position: 'absolute',
    textAlign: 'center',
    top: '35px',
    zIndex: 1,
    width: '140px'
  },

  dropdownElement: {
    padding: '10px 0px',
    ':hover': {
      backgroundColor: colors.lightGrey,
    }
  },

  userIcon: {
    marginRight: '10px'
  }
};
