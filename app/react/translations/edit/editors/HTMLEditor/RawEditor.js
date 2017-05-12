/* @flow */
import React from 'react';
import HTMLRenderer from '../../../detail/renderers/HTMLRenderer';
import ToggleHTMLButton from './components/ToggleHTMLButton';

type PropTypes = {
  onChange: Function,
  toggleRawEdit: Function,
  editAsRaw: boolean,
  value: string,
  fieldInfo: Object
}

export default class RawEditor extends React.Component {

  props: PropTypes

  // eslint-disable-next-line react/no-unused-prop-types
  handleChange = ({ target }: { target: HTMLInputElement }) =>
    this.props.onChange(target.value, this.props.fieldInfo);

  render() {
    const { value, editAsRaw, toggleRawEdit } = this.props;
    return (
      <div>
        <ToggleHTMLButton
          editAsRaw={editAsRaw}
          toggleRawEdit={toggleRawEdit}
        />
        <HTMLRenderer value={value} />
        <textarea
          placeholder="Insert raw HTML"
          value={value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
