/* @flow */
import React, { Component } from 'react';

type PropTypes = {
  onChange: Function,
  onSubmit: Function,
  value: string,
  saved: boolean,
  fieldInfo: Object
};

export default class BooleanEditor extends Component {
  setFalse = () => {
    this.props.onChange('false', this.props.fieldInfo);
  }
  setTrue = () => {
    this.props.onChange('true', this.props.fieldInfo);
  }

  props: PropTypes

  handleSubmit = (e: Event) => {
    e.preventDefault();
    this.props.onSubmit(this.props.value, this.props.fieldInfo);
  }

  render() {
    const { value, saved, fieldInfo: { fieldId } } = this.props;

    return (
      <div>
        <form>
          True:
          <input
            type="radio"
            name={`true-${fieldId}`}
            checked={value === 'true'}
            value={value === 'true'}
            onChange={this.setTrue}
          />
          False:
          <input
            type="radio"
            name={`false-${fieldId}`}
            checked={value === 'false'}
            value={value === 'false'}
            onChange={this.setFalse}
          />
          <button
            onClick={this.handleSubmit}
            style={saved ? styles.default : styles.edited}
          >Save</button>
        </form>
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
