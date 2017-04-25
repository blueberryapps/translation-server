/* @flow */
import React, { Component } from 'react';

export default class BooleanEditor extends Component {
  props: {
    value: string,
    currentValue: boolean
  };

  render() {
    const { value, currentValue } = this.props;
    return (
      <div>
        <div>
          {value}
        </div>
        <div>
          False:
          <input
            type="radio"
            checked={!currentValue}
            placeholder="Insert your translation here"
          />
          True:
          <input
            type="radio"
            checked={currentValue}
            placeholder="Insert your translation here"
          />
        </div>
      </div>
    );
  }
}
