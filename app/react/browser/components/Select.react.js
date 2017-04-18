import React, { PropTypes as RPT } from 'react';
import Radium from 'radium';

import handleEvent from './handleEvent';
import { colors } from '../globals';

const getSelectedValue = (value) => {
  if (typeof value === 'boolean') {
    return value.toString();
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
    <option key={value} value={typeof value === 'boolean' ? value.toString() : value}>
      {optionText}
    </option>
  );
};

@Radium
export default class Select extends React.PureComponent {

  static propTypes = {
    children: RPT.arrayOf(RPT.node),
    error: RPT.string,
    name: RPT.string.isRequired,
    onBlur: RPT.func.isRequired,
    onChange: RPT.func.isRequired,
    onFocus: RPT.func.isRequired,
    options: RPT.arrayOf(
      RPT.shape({
        value: RPT.oneOfType([RPT.string, RPT.number]),
        text: RPT.string,
        tooltip: RPT.string,
      })
    ),
    placeholder: RPT.string,
    selectSize: RPT.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
    style: RPT.oneOfType([
      RPT.arrayOf(RPT.object),
      RPT.object
    ]),
    value: RPT.oneOfType([RPT.bool, RPT.string, RPT.number])
  }

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
      </div>
    );
  }
}

const styles = {
  select: {
    appearance: 'none',
    backgroundColor: colors.lightGrey,
    borderColor: 'hsl(0, 0%, 80%)',
    borderRadius: '2px',
    borderStyle: 'solid',
    borderWidth: '1px',
    color: 'hsl(0, 0%, 30%)',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '300',
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
    right: 0,
    top: '1px',
    userSelect: 'none',
    width: '24px',
    '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)': {
      display: 'none'
    }
  }
};
