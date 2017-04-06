import Radium from 'radium';
import React, { PropTypes as RPT } from 'react';

export const CONTAINER_NORMAL = 'normal';
export const CONTAINER_SLIM = 'slim';

@Radium
export default class Container extends React.PureComponent {

  static propTypes = {
    children: RPT.node.isRequired,
    kind: RPT.oneOf([
      CONTAINER_NORMAL,
      CONTAINER_SLIM
    ]),
    style: RPT.oneOfType([
      RPT.arrayOf(RPT.object),
      RPT.object
    ])
  }

  static defaultProps = {
    kind: CONTAINER_NORMAL,
    style: {}
  }

  render() {
    const { children, kind, style } = this.props;

    return (
      <div
        style={[
          styles.default,
          kind && styles.variant[kind],
          style
        ]}
      >
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
      maxWidth: '1040px'
    },
    [CONTAINER_SLIM]: {
      padding: '0 30px',
      maxWidth: '960px'
    },
  }
};
