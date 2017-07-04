/* @flow */
import autobind from 'core-decorators/lib/autobind';
import Radium from 'radium';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actions from '../../ui/actions';
import { colors } from '../../globals';

@connect(
  ({ ui }) => ({
    isVerticalMenuShown: ui.get('isVerticalMenuShown'),
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
@withRouter
@Radium
export default class Menubar extends React.PureComponent {
  static defaultProps = {
    translatedCount: 0,
    totalCount: 0,
  };
  props: {
    toggleHierarchy: Function,
    isVerticalMenuShown: boolean,
    translatedCount: number,
    totalCount: number,
    location: {
      query: Object
    },
    push: Function
  }

  @autobind handleToggleHierarchy() {
    const { isVerticalMenuShown, toggleHierarchy } = this.props;

    toggleHierarchy(!isVerticalMenuShown);
  }

  handleShowUntranslated = () => {
    this.props.push({
      ...this.props.location,
      query: { ...this.props.location.query, edited: 'new' },
    });
  };

  handleShowAll = () => {
    this.props.push({
      ...this.props.location,
      query: { ...this.props.location.query, edited: 'all' },
    });
  };

  render() {
    const { totalCount, translatedCount, location: { query } } = this.props;
    return (
      <div style={styles.wrapper}>
        <button onClick={this.handleToggleHierarchy} style={styles.verticalMenu}>
          Navigate by key
        </button>
        <div style={styles.translationButtons}>
          <button
            disabled={query.edited === 'new'}
            onClick={this.handleShowUntranslated}
            style={[styles.button, query.edited === 'new' && styles.active]}
          >
            Untranslated
            <div style={styles.number}>{totalCount - translatedCount}</div>
          </button>
          <div style={styles.separator} />
          <button
            onClick={this.handleShowAll}
            style={[styles.button, query.edited === 'all' && styles.active]}
            disabled={!query.edited || query.edited === 'all'}
          >
            All
            <div style={styles.number}>{totalCount}</div>
          </button>

        </div>
      </div>
    );
  }
}

const styles = {
  wrapper: {
    backgroundColor: colors.primary,
    position: 'fixed',
    zIndex: 100,
    top: '65px',
    left: 0,
    right: 0,
    height: '50px',
  },
  translationButtons: {
    justifyContent: 'center',
    display: 'flex',
    width: '100%',
  },
  button: {
    width: '150px',
    textAlign: 'center',
    border: 'none',
    backgroundColor: colors.primary,
    fontSize: '17px',
    height: '50px',
    color: colors.white,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    fontWeight: 400,
    borderColor: 'transparent',
    borderStyle: 'solid',
    borderWidth: '0 0 4px 0',
  },
  number: {
    fontSize: '13px',
    opacity: .6
  },
  active: {
    borderColor: colors.white,
  },
  verticalMenu: {
    borderColor: colors.darkBlue,
    backgroundColor: colors.primary,
    color: colors.white,
    position: 'absolute',
    left: 0,
    top: 0,
    borderStyle: 'solid',
    borderWidth: '0 1px 0 0',
    fontWeight: 900,
    fontSize: '14px',
    height: '50px',
    textTransform: 'uppercase',
    padding: '13px 32px',
    ':focus': {
      outline: 'none'
    },
    ':hover': {
      backgroundColor: colors.darkBlue,
    },
  },
  separator: {
    display: 'inline-flex',
    height: '50px',
    width: '1px',
    backgroundColor: colors.darkBlue
  }
};
