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
  toggleRadio = () => {
    const { onChange, value } = this.props;
    onChange(!value);
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
            onChange={this.toggleRadio}
          />
          False:
          <input
            type="radio"
            name={`false-${fieldId}`}
            checked={value === 'false'}
            value={value === 'false'}
            onChange={this.toggleRadio}
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
