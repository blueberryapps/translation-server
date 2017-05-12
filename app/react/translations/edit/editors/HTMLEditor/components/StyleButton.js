/* @flow */
import React from 'react';

type PropTypes = {
  onToggle: Function,
  active: boolean,
  label: string,
  style: string
}

export default class StyleButton extends React.Component {
  constructor(props: PropTypes) {
    super(props);
    this.onToggle = (event: Event) => {
      event.preventDefault();
      props.onToggle(props.style);
    };
  }

  onToggle: Function
  props: PropTypes

  render() {
    const { active, label } = this.props;
    const className = active
      ? 'RichEditor-styleButton RichEditor-activeButton'
      : 'RichEditor-styleButton';
    return (
      <span
        className={className}
        onMouseDown={this.onToggle}
        style={{ padding: '3px' }}
      >
        {label}
      </span>
    );
  }
}
