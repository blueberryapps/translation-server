import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../app/Header.react';
import Container from '../components/Container.react';

@connect(state => ({ error: state.ui.get('error') }))
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
      <Container style={styles.wrapper} error={error}>
        <Header />
        {children}
      </Container>
    );
  }
}

const styles = {
  wrapper: {
    maxWidth: '90%',
    paddingLeft: 0,
    paddingRight: 0,
  },
};
