/* @flow */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-static-element-interactions */
import autobind from 'core-decorators/lib/autobind';
import Radium from 'radium';
import React from 'react';
import { connect } from 'react-redux';

import Icon from '../../components/Icon.react';
import { colors } from '../../globals';
import { signOut } from '../actions';

@Radium
class Menu extends React.PureComponent {
  static defaultProps = {
    style: {}
  }

  state = {
    visibility: false
  }

  props: {
    style: Object | Array<string>,
    user: string,
    signOut: () => Promise<*>
  }

  @autobind
  handleClick() {
    this.setState({ visibility: !this.state.visibility });
  }

  redirectToOldVersion = () => {
    window.location.href = '/';
  }

  render() {
    const { user, style } = this.props;
    const { visibility } = this.state;

    return (
      <div style={[styles.dropdown, style]}>
        <span onClick={this.handleClick} style={styles.user}>
          <Icon color="white" style={styles.icon.base} kind="person" size={20} wrapperStyle={styles.icon.wrapper} />
          {user}
        </span>
        {/* $FlowFixMe */}
        <ul style={[styles.dropdownList, styles.dropdownVisibility[visibility]]}>
          <li
            style={styles.dropdownElement}
            key="oldVersion"
            onClick={this.redirectToOldVersion}
          >
            Old version
          </li>
          <li
            style={styles.dropdownElement}
            key="signOut"
            onClick={this.props.signOut}
          >
            Sign out
          </li>
        </ul>
      </div>
    );
  }
}

export default connect(() => ({}), { signOut })(Menu);

const styles = {
  dropdown: {
    marginLeft: '25px',
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
  user: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '19px'
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
  icon: {
    base: {
      position: 'absolute',
      bottom: 0,
      left: '50%',
      marginLeft: '-10px'
    },
    wrapper: {
      marginRight: '10px',
      borderRadius: '50%',
      overflow: 'hidden',
      position: 'relative',
      width: '26px',
      height: '26px',
      backgroundColor: colors.primary
    }
  }
};
