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

  handleBlur = (e) => {
    if (this.props.pressedKeyCode === 9) this.handleSubmit();
  }

  handleSubmit = () => {
    const { fieldInfo, value } = this.props;
    // console.log('fiel', fieldInfo, value)
    this.props.onSubmit(value, fieldInfo);
  }

  render() {

    const { value, dataType, saved } = this.props;

    // console.log('ppp', saved)
    return (
      <div>
        <form>
          <input
            type={typeRegistry[dataType]}
            value={value}
            onKeyDown={this.props.registerPressKey}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          {!saved && <span>Unsaved</span>}
        </form>
      </div>
    );
  }
}
