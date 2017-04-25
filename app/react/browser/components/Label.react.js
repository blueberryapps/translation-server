import Radium from 'radium';
import React from 'react';

@Radium
export default class Label extends React.PureComponent {
  static defaultProps = {
    inheritedStyle: {},
    name: 'Label',
    optional: ''
  };

  props: {
    children: Node,
    inheritedStyle: Array<Object> | Object,
    name?: string,
    optional?: string
  }

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
