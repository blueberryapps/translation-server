// @flow
import Radium from 'radium';
import React from 'react';
import { connect } from 'react-redux';
import Container from '../components/Container.react';
import { colors } from '../globals';

type PropTypes = {
  children: Node,
  error?: string,
  isVerticalMenuShown?: boolean
}

@connect(state => ({ error: state.ui.get('error') }))
@Radium
export default class ApplicationLayout extends React.PureComponent {
  static defaultProps = {
    error: '',
    isVerticalMenuShown: false
  }
  props: PropTypes

  render() {
    const { children, error, isVerticalMenuShown } = this.props;

    return (
      <div style={styles.wrapper}>
        <Container error={error} style={[isVerticalMenuShown && styles.isVerticalMenuShown]}>
          {children}
        </Container>
      </div>
    );
  }
}

const styles = {
  wrapper: {
    paddingTop: '165px',
    backgroundColor: colors.backgroundGrey,
    minHeight: '100vh',
    overflow: 'hidden'
  },
  isVerticalMenuShown: {
    '@media screen and (max-width: 1900px)': {
      transition: 'margin .2s',
      margin: '0 auto 0 430px'
    }
  }
};
