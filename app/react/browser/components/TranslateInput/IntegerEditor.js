/* @flow */
import React, { Component } from 'react';

export default class IntegerEditor extends Component {
  props: {
    value: string,
    currentValue: string,
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
    const { value, currentValue } = this.props;
    return (
      <div>
        <div>
          {value}
        </div>
        <div>
          <input
            type="number"
            onChange={this.handleValueChange}
            defaultValue={+value}
            value={currentValue}
            placeholder="Insert your translation here"
          />
        </div>
      </div>
    );
  }
}
