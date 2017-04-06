import autobind from 'core-decorators/lib/autobind';
import Radium from 'radium';
import React, { PropTypes as RPT } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from '../../components/Button.react';
import { change } from '../../../common/ui/actions';
import { colors } from '../../globals';

@connect(
  ({ ui: reducer }) => ({
    isVerticalMenuShown: reducer.get('isVerticalMenuShown')
  }),
  dispatch => bindActionCreators({ change }, dispatch)
)
@Radium
export default class Menubar extends React.PureComponent {

  static propTypes = {
    change: RPT.func.isRequired,
    isVerticalMenuShown: RPT.bool.isRequired
  }

  @autobind
  handleClick() {
    const { isVerticalMenuShown, change } = this.props;

    change('VerticalMenu', !isVerticalMenuShown);
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <div style={styles.menuButton}>
          <Button onClick={this.handleClick} style={styles.verticalMenu}>Navigate by key</Button>
        </div>
        <div style={styles.translationButtons}>
          <Button style={[styles.translations, styles.untranslated]}>Untranslated</Button>
          <Button style={styles.translations}>All</Button>
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
    width: '100%'
  },

  menuButton: {
    position: 'absolute'
  },

  translations: {
    fontSize: '16px',
    padding: '13px 32px'
  },

  untranslated: {
    borderColor: `${colors.darkBlue}`,
    borderStyle: 'solid',
    borderWidth: '0 1px 0 0'
  },

  verticalMenu: {
    borderColor: `${colors.darkBlue}`,
    borderStyle: 'solid',
    borderWidth: '0 1px 0 0',
    fontSize: '16px',
    padding: '13px 32px',
    ':active': {
      backgroundColor: colors.darkBlue
    }
  }
};
