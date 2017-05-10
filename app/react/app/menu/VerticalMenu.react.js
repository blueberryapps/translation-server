import React from 'react';

export default class VerticalMenu extends React.PureComponent {
  render() {
    return (
      <div style={styles.wrapper}>
        Vertical Menu
      </div>
    );
  }
}

const styles = {
  wrapper: {
    display: 'inline-block',
    height: '100%',
    width: '300px'
  }
};
