/* @flow */
import React from 'react';

type PropTypes = {
  children: Node
}

const RendererWrapper = ({ children }: PropTypes) => (
  <div style={styles.wrapper}>
    {children}
  </div>
);

export default RendererWrapper;

const styles = {
  wrapper: {
    padding: '25px',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 0 7px hsla(0, 0%, 0%, 0.1)'
  }
};
