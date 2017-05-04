import React, { Component } from 'react';

const typeRegistry = {
  string: 'text',
  symbol: 'text',
  integer: 'number',
  float: 'number',
};

export default class SimpleEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: true
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    this.props.onChange(e.target.value, this.props.fieldInfo);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.props.value, this.props.fieldInfo);
  }

  render() {
    // console.log('I\'m editor =>', this.props.onChange);
    const { value, dataType } = this.props;

    return (
      <div>
        <form>
          <input
            type={typeRegistry[dataType]}
            value={value}
            onChange={this.handleChange}
          />
          <button
            onClick={this.handleSubmit}
            style={{ backgroundColor: this.props.saved ? null : 'green' }}
          >Save</button>
        </form>
      </div>
    );
  }
}
