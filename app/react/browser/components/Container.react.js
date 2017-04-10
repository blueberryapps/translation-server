import Radium from 'radium';
import React, { PropTypes as RPT } from 'react';
import ErrorMessage from './ErrorMessage.react';

export const CONTAINER_NORMAL = 'normal';
export const CONTAINER_SLIM = 'slim';

@Radium
export default class Container extends React.PureComponent {
  static defaultProps = {
    error: null,
  };
  static propTypes = {
    children: RPT.node.isRequired,
    error: RPT.oneOfType([null, RPT.string]),
    kind: RPT.oneOf([CONTAINER_NORMAL, CONTAINER_SLIM]),
    style: RPT.oneOfType([RPT.arrayOf(RPT.object), RPT.object]),
  };

  static defaultProps = {
    kind: CONTAINER_NORMAL,
    style: {},
  };

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
    maxWidth: '1140px',
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
