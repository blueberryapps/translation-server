/* @flow */
import Textarea from 'react-textarea-autosize';
import Radium from 'radium';
import React from 'react';
import ToggleHTMLButton from './components/ToggleHTMLButton';
import { colors } from '../../../../globals';

import type { FieldInfo } from '../../index';

type PropTypes = {
  onChange: Function,
  toggleRawEdit: Function,
  editAsRaw: boolean,
  registerTabPress: Function,
  handleSubmit: Function,
  tabPressed: ?boolean,
  value: string,
  fieldInfo: FieldInfo
}

@Radium
export default class RawEditor extends React.Component {

  props: PropTypes

  handleBlur = () =>
    this.props.tabPressed && this.props.handleSubmit();


  // eslint-disable-next-line react/no-unused-prop-types
  handleChange = ({ target }: { target: HTMLInputElement }) =>
    this.props.onChange(target.value, this.props.fieldInfo);

  render() {
    const { value, editAsRaw, toggleRawEdit, registerTabPress } = this.props;

    return (
      <div>
        <div style={styles.controls}>
          <ToggleHTMLButton
            editAsRaw={editAsRaw}
            toggleRawEdit={toggleRawEdit}
          />
        </div>
        <Textarea
          placeholder="Insert raw HTML"
          value={value}
          onKeyDown={registerTabPress}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          style={styles.textarea}
        />
      </div>
    );
  }
}

const styles = {
  controls: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingBottom: '25px',
    borderBottom: `1px solid ${colors.inputBorder}`
  },
  textarea: {
    display: 'block',
    padding: '25px 0',
    border: 'none',
    width: '100%',
    minHeight: '40px',
    resize: 'none',
    wordWrap: 'break-word',
    ':focus': {
      outline: 'none'
    }
  }
};
