/* @flow */
import autobind from 'core-decorators/lib/autobind';
import Radium from 'radium';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Button from '../../components/Button.react';
import * as actions from '../../ui/actions';
import { colors } from '../../globals';

@connect(
  ({ ui }) => ({
    isVerticalMenuShown: ui.get('isVerticalMenuShown'),
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
@Radium
@withRouter
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
        <div style={styles.menuButton}>
          <Button onClick={this.handleToggleHierarchy} style={styles.verticalMenu}>
            Navigate by key
          </Button>
        </div>
        <div style={styles.translationButtons}>
          <Button
            disabled={query.edited === 'new'}
            onClick={this.handleShowUntranslated}
            style={[styles.translations, styles.untranslated]}
          >
            Untranslated {totalCount - translatedCount}
          </Button>
          <Button
            onClick={this.handleShowAll}
            style={styles.translations}
            disabled={!query.edited || query.edited === 'all'}
          >
            All {totalCount}
          </Button>

        </div>
      </div>
    );
  }
}

const styles = {
  wrapper: {
    backgroundColor: colors.primary,
    height: '50px',
  },

  translationButtons: {
    textAlign: 'center',
    width: '100%',
  },

  menuButton: {
    position: 'absolute',
  },

  translations: {
    fontSize: '16px',
    padding: '13px 32px',
  },

  untranslated: {
    borderColor: `${colors.darkBlue}`,
    borderStyle: 'solid',
    borderWidth: '0 1px 0 0',
  },

  verticalMenu: {
    borderColor: `${colors.darkBlue}`,
    borderStyle: 'solid',
    borderWidth: '0 1px 0 0',
    fontSize: '16px',
    padding: '13px 32px',
    ':active': {
      backgroundColor: colors.darkBlue,
    },
  },
};
