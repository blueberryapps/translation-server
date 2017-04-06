import React, { PropTypes } from 'react';

import Container from '../components/Container.react';

export default class ApplicationLayout extends React.PureComponent {

  static propTypes = {
    children: PropTypes.node.isRequired
  }

  render() {
    const { children } = this.props;

    return (
      <Container style={styles.wrapper}>
        {children}
      </Container>
    );
  }
}

const styles = {
  wrapper: {
    maxWidth: '90%',
    paddingLeft: 0,
    paddingRight: 0
  }
};
