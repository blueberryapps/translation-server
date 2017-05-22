import React from 'react';

type ArrayInfo = {
  index: number,
  length: number
}

type PropTypes = {
  value: string,
  index: number,
  length: number,
  // eslint-disable-next-line react/no-unused-prop-types
  onChange: Function,
  onKeyDown: Function,
};

export default class ElementEditor extends React.Component {

  componentDidMount = () => this.input.focus();

  props: PropTypes

  handleChange = (arrayInfo: ArrayInfo, event: Event) =>
    this.props.onChange(arrayInfo, event);
  handleKeyDown = (arrayInfo: ArrayInfo, event: Event) =>
    this.props.onKeyDown(arrayInfo, event);


  render() {
    const arrayInfo: ArrayInfo = {
      index: this.props.index,
      length: this.props.length,
    };

    return (
      <input
        value={this.props.value}
        ref={(element: HTMLElement): void => { this.input = element; }}
        onChange={e => this.handleChange(e, arrayInfo)}
        onKeyDown={e => this.handleKeyDown(e, arrayInfo)}
      />
    );
  }


}
