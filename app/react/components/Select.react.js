import React from 'react';
import Radium from 'radium';

import Icon from './Icon.react';
import handleEvent from './handleEvent';
import { colors } from '../globals';

const getSelectedValue = (value) => {
  if (typeof value === 'boolean') {
    return `${value}`;
  }

  if (typeof value === 'number' && !isNaN(value)) {
    return value;
  }

  return value || '';
};

const renderOption = (option) => {
  const { text, value } = option;
  const optionText = text || value;
  return (
    <option key={value} value={`${value}`}>
      {optionText}
    </option>
  );
};

type Option = {
  value?: string | number,
  text?: string,
  tooltip?: string
}

@Radium
export default class Select extends React.PureComponent {
  static defaultProps = {
    children: null,
    error: null,
    options: [
      { value: 'test value 1', text: 'Test Value 1' },
      { value: 'test value 2', text: 'Test Value 2' }
    ],
    placeholder: 'Everything',
    selectSize: 1,
    style: {},
    value: 'Value'
  }

  props: {
    children?: Node,
    error?: string,
    name: string,
    onBlur: Function,
    onChange: Function,
    onFocus: Function,
    options: Array<Option>,
    placeholder: string,
    selectSize: number,
    style: Object | Array<Object>,
    value: string | boolean | number,
  }

  render() {
    const {
      children,
      error,
      name,
      options,
      onBlur,
      onChange,
      onFocus,
      placeholder,
      selectSize,
      style,
      value
    } = this.props;
    const selectedValue = getSelectedValue(value);

    return (
      <div style={[styles.selectWrapper, selectSize && styles.selectWrapper.size[selectSize]]}>
        <select
          key="select"
          name={name}
          onBlur={handleEvent.bind(null, name, onBlur)}
          onChange={handleEvent.bind(null, name, onChange)}
          onFocus={handleEvent.bind(null, name, onFocus)}
          style={[
            styles.select,
            error && styles.errorSelect,
            style
          ]}
          value={selectedValue}
        >
          {!!placeholder &&
            <option disabled key="blank" value="">{placeholder}</option>
          }
          {children || options.map(renderOption)}
        </select>
        <Icon kind="arrow" color="black" size={10} style={styles.icon} />
      </div>
    );
  }
}

const styles = {
  select: {
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppeareance: 'input',
    backgroundColor: colors.lightGrey,
    borderColor: colors.inputBorder,
    color: colors.inputColor,
    borderStyle: 'solid',
    borderWidth: '1px',
    borderRadius: 0,
    cursor: 'pointer',
    paddingRight: '25px',
    paddingLeft: '15px',
    height: '40px',
    fontSize: '14px',
    fontWeight: 400,
    outline: 'none',
    position: 'relative',
    transition: 'border-color .2s',
    verticalAlign: 'middle',
    width: '120px',
    ':focus': {
      borderColor: colors.primary
    }
  },

  errorSelect: {
    borderColor: colors.error,
    transition: 'box-shadow 0.2s',
    ':focus': {
      borderColor: '#a60017',
      boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ff405a'
    }
  },

  selectWrapper: {
    display: 'inline-block',
    position: 'relative',
    size: {
      1: {
        maxWidth: 80
      },
      2: {
        maxWidth: 110
      },
      3: {
        maxWidth: 140
      },
      4: {
        maxWidth: 170
      },
      5: {
        maxWidth: 200
      },
      6: {
        maxWidth: 230
      },
      7: {
        maxWidth: 260
      },
      8: {
        maxWidth: 290
      },
      9: {
        maxWidth: 320
      },
      10: {
        maxWidth: 350
      }
    },
  },

  icon: {
    color: colors.black,
    pointerEvents: 'none',
    position: 'absolute',
    right: '15px',
    top: '50%',
    marginTop: '-5px',
    userSelect: 'none'
  }
};
