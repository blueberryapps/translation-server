import Radium from 'radium';
import React, { PropTypes as RPT } from 'react';

@Radium
export default class Label extends React.PureComponent {

  static propTypes = {
    children: RPT.node.isRequired,
    inheritedStyle: RPT.oneOfType([RPT.array, RPT.object]),
    name: RPT.string,
    optional: RPT.string
  }

  static defaultProps = {
    inheritedStyle: {},
    name: 'Label',
    optional: ''
  };

  render() {
    const { children, inheritedStyle, name, optional } = this.props;

    return (
      <label
        htmlFor={name}
        style={[styles.base, inheritedStyle]}
      >
        {children}
        {!!optional && <span style={styles.optional}>{` (${optional})`}</span>}
      </label>
    );
  }
}
const styles = {
  base: {
    display: 'block',
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'hsl(0, 0%, 30%)',
    marginBottom: '3px'
  },
  optional: {
    fontWeight: '300',
    fontSize: '13px',
    color: 'hsl(0, 0%, 50%)'
  }
};
