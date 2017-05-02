/* @flow */
import React, { Component } from 'react';

export default class ArrayEditor extends Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      values: ['']
    };
  }

  state: {
    values: Array<string>
  }

  props: {
    onChange: Function,
  }

  changeArraySize = (index: number) => (event: Event) => {
    if (event.charCode === 13) {
      this.setState({ values: [...this.state.values, ''] });
      /* $FlowFixMe */
      this[`${index}-array-part`].focus();
    }

    if (index && event.charCodeAt === 8 && !this.state.values[index]) {
      this.setState({ values: this.state.values.slice(0, -1) });
      /* $FlowFixMe */
      this[`${index - 1}-array-part`].focus();
    }
  }

  render() {
    const {
      onChange,
    } = this.props;

    return (
      <div>
        <ul>
          {this.state.values.map((value, i) => (
            <li>
              <input
                /* $FlowFixMe */
                ref={(reference) => { this[`${i}-array-part`] = reference; }}
                key={`${i}-sorry-for-using-indexes`} // eslint-disable-line react/no-array-index-key
                onKeyDown={this.changeArraySize(i)}
                onChange={() => this.props.onChange(this.state.values)}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
