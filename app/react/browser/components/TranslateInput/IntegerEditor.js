/* @flow */
import React, { Component } from 'react';

export default class IntegerEditor extends Component {
  props: {
    value: number,
    defaultValue: number,
    onChange: Function,
    id: number,
    localeId: number
  };

  handleValueChange = (event: Event) => {
    event.preventDefault();
    this.props.onChange({
      id: this.props.id,
      localeId: this.props.localeId
      /* $FlowFixMe */
    }, event.target.value);
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
            type="number"
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
