import Radium from 'radium';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Container from '../components/Container.react';
import { colors } from '../globals';

@connect(state => ({ error: state.ui.get('error') }))
@Radium
export default class ApplicationLayout extends React.PureComponent {
  static defaultProps = {
    error: null,
  };
  static propTypes = {
    children: PropTypes.node.isRequired,
    error: PropTypes.string,
  };

  render() {
    const { children, error } = this.props;
    return (
      <div style={styles.wrapper}>
        <Container error={error}>
          {children}
        </Container>
      </div>
    );
  }
}

const styles = {
  wrapper: {
    paddingTop: '100px',
    backgroundColor: colors.backgroundGrey,
    minHeight: '100vh',
    overflow: 'hidden'
  }
};
