/* @flow */
import React from 'react';
import mapProps from './mapProps';
import generateListOf from './generateListOf';
import ElementEditor from './ElementEditor';

type PropTypes = {
  onChange: Function,
  // eslint-disable-next-line react/no-unused-prop-types
  onSubmit: Function,
  saved: boolean,
  fieldInfo: Object,
  value: string,
  List: Element,
};

const parseArray = (propValue, propKey) => {
  switch (propKey) {
    case 'value': return JSON.parse(propValue);
    case 'onChange': return (value, fieldId) =>
      propValue(JSON.stringify(value), fieldId);
    case 'onSubmit': return (value, fieldId) =>
      propValue(JSON.stringify(value), fieldId);
    default:
      return propValue;
  }
};

@mapProps(parseArray)
@generateListOf(ElementEditor)
export default class ArrayEditor extends React.PureComponent {

  props: PropTypes

  _popArray = () => {
    const { onChange, fieldInfo, value } = this.props;
    const updatedArray = value.slice(0, value.length - 1);

    onChange(updatedArray, fieldInfo);
  }
  _pushArray = () => { // 1
    const { onChange, fieldInfo, value } = this.props;
    const updatedArray = [...value, ''];

    onChange(updatedArray, fieldInfo);
  }

  _updateArray = (index, newValue) => {
    const { onChange, fieldInfo, value } = this.props;
    const updatedArray = value.map((el, i) => (i === index) ? newValue : el);

    onChange(updatedArray, fieldInfo);
  }

  handleChange = (event, { index }) => {
    event.preventDefault();
    const newValue = event.target.value;

    this._updateArray(index, newValue);
  }

  handleKeyDown = (event, { index, length }) => {
    const isEmpty = event.target && !event.target.value;
    const isLast = index === length - 1;
    if (event.keyCode === 13) {
      this._pushArray();
    }
    if (event.keyCode === 8 && isLast && isEmpty) {
      this._popArray();
    }
  }

  handleSubmit = (e: Event) => {
    e.preventDefault();
    this.props.onSubmit(this.props.value, this.props.fieldInfo);
  }

  render() {
    const { saved, List } = this.props;
    return (
      <div>
        {List && <List
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />}
        <button
          onClick={this.handleSubmit}
          style={saved ? styles.default : styles.edited}
        >
          Save
        </button>
      </div>
    );
  }
}

const styles = {
  default: {},
  edited: {
    backgroundColor: 'green'
  }
};
