/* @flow */
import React, { Component } from 'react';

export default class BooleanEditor extends Component {
  props: {
    value: boolean,
    defaultValue: boolean
  };

  render() {
    const { value, defaultValue } = this.props;
    return (
      <div>
        <div>
          {value}
        </div>
        <div>
          False:
          <input
            type="radio"
            checked={!value}
            defaultValue={!defaultValue}
            placeholder="Insert your translation here"
          />
          True:
          <input
            type="radio"
            checked={value}
            defaultValue={defaultValue}
            placeholder="Insert your translation here"
          />
        </div>
      </div>
    );
  }
}
