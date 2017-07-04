import Radium from 'radium';
import React from 'react';

import handleEvent from './handleEvent';
import { colors } from '../globals';

@Radium
export default class TextField extends React.PureComponent {
  static defaultProps = {
    optional: null,
    type: 'text',
    placeholder: 'Enter your text',
    style: {},
    value: ''
  };

  props: {
    name: string,
    onBlur: Function,
    onChange: Function,
    onFocus: Function,
    placeholder?: string,
    style?: Object | Array<Object>,
    type: string,
    value?: string
  }

  render() {
    const { name, placeholder, value, type, style, onChange, onBlur, onFocus } = this.props;

    return (
      <input
        id={name}
        key="input"
        name={name}
        onBlur={handleEvent.bind(null, name, onBlur)}
        onChange={handleEvent.bind(null, name, onChange)}
        onFocus={handleEvent.bind(null, name, onFocus)}
        placeholder={placeholder}
        style={[
          styles.inputBase,
          style
        ]}
        type={type}
        value={value}
      />
    );
  }
}

const styles = {
  inputBase: {
    backgroundColor: colors.lightGrey,
    borderColor: colors.inputBorder,
    color: colors.inputColor,
    borderStyle: 'solid',
    borderWidth: '1px',
    display: 'inline-block',
    fontSize: '16px',
    fontWeight: 400,
    height: '40px',
    width: '290px',
    padding: '0px 20px 0px 20px',
    verticalAlign: 'middle',
    ':focus': {
      borderColor: colors.primary,
      outline: 'none'
    }
  }
};
