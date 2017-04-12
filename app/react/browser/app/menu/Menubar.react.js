import autobind from 'core-decorators/lib/autobind';
import Radium from 'radium';
import React, { PropTypes as RPT } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Button from '../../components/Button.react';
import * as actions from '../../../common/ui/actions';
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
  static propTypes = {
    toggleHierarchy: RPT.func.isRequired,
    isVerticalMenuShown: RPT.bool.isRequired,
    translatedCount: RPT.number,
    totalCount: RPT.number,
    location: RPT.shape({ query: RPT.shape({}) }).isRequired,
    router: RPT.shape({ push: RPT.func }).isRequired,
  };

  @autobind handleToggleHierarchy() {
    const { isVerticalMenuShown, toggleHierarchy } = this.props;

    toggleHierarchy(!isVerticalMenuShown);
  }

  handleShowUntranslated = () => {
    this.props.router.push({
      ...this.props.location,
      query: { ...this.props.location.query, edited: 'new' },
    });
  };

  handleShowAll = () => {
    this.props.router.push({
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
