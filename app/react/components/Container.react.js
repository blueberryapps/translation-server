import Radium from 'radium';
import React from 'react';
import ErrorMessage from './ErrorMessage.react';

export const CONTAINER_NORMAL = 'normal';
export const CONTAINER_SLIM = 'slim';

@Radium
export default class Container extends React.PureComponent {
  static defaultProps = {
    error: null,
    kind: CONTAINER_NORMAL,
    style: {},
  };

  props: {
    children: Node,
    error?: null | string,
    kind?: string,
    style?: Array<Object> | Object
  }

  render() {
    const { children, kind, style, error } = this.props;
    return (
      <div style={[styles.default, kind && styles.variant[kind], style]}>
        {error && <ErrorMessage message={error} />}
        {children}
      </div>
    );
  }
}

const styles = {
  default: {
    margin: '0 auto',
    maxWidth: '100%',
    position: 'relative',
  },
  variant: {
    [CONTAINER_NORMAL]: {
      paddingRight: '30px',
      paddingLeft: '30px',
      maxWidth: '1040px',
    },
    [CONTAINER_SLIM]: {
      padding: '0 30px',
      maxWidth: '960px',
    },
  },
};
