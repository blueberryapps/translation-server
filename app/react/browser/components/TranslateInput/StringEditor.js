/* @flow */
import React, { Component } from 'react';

export default class StringEditor extends Component {
  props: {
    value: string,
    defaultValue: string | null,
    onChange: Function,
    // id: number,
    // localeId: number
  };

  handleValueChange = (event: Event) => {
    event.preventDefault();
    this.props.onChange(event.target.value);
  }

  render() {
    const { value, defaultValue } = this.props;
    return (
      <div>
        <div>
          {value}
        </div>
        <div>
          <input
            type="text"
            onChange={this.handleValueChange}
            defaultValue={defaultValue}
            value={value}
            placeholder="Insert your translation here"
          />
        </div>
      </div>
    );
  }
}
