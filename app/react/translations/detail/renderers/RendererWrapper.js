/* @flow */
import React from 'react';

type PropTypes = {
  children: Node
}

// eslint-disable-next-line no-undef
export default function RendererWrapper({ children }: PropTypes) {
  return (
    <div style={styles.wrapper}>
      {children}
    </div>
  );
}

const styles = {
  wrapper: {
    padding: '25px',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 0 7px hsla(0, 0%, 0%, 0.1)'
  }
};
